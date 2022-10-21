import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ISale, ITicket, List, ReadOptions, ReadSelesOptions } from 'src/repositories/types';
import { Payment, Sale, Ticket } from 'src/repositories/entities';
import {
	DatabaseException,
	existsOrError,
	messages,
	PaymentException,
	responseDataBaseCreate,
	responseDataBaseUpdate,
	saleVerify,
} from 'src/utils';
import { PayService } from 'src/services/pay.service';
import { CredCardPaymentModel, DebitCardPaymentModel, PixPaymentModel } from 'src/repositories/models';
import { TicketService } from 'src/services/ticket.service';
import { onLog } from 'src/core/handlers';
import { PaymentService } from './payment.service';

export class SaleService extends BaseService {
	constructor(
		options: BaseServiceOptions,
		private payService: PayService,
		private ticketService: TicketService,
		private paymentService: PaymentService
	) {
		super(options);
	}

	validate(data: ISale) {
		existsOrError(data.amount, messages.requires('Quantidade'));
		existsOrError(data.unitaryValue, messages.requires('Valor Unitario'));
		existsOrError(data.paymentId, messages.requires('Forma de pagemanto'));
		existsOrError(data.ticketId, messages.requires('Ticket'));
	}

	async create(item: Sale) {
		const reserve = await this.reserveTickets(item);
		onLog('reserveTickets', reserve);
		const payment = item.paymentId ? await this.paymentService.findOneById(item.paymentId) : 'Pix Payment';
		onLog('payment', payment);

		try {
			saleVerify(reserve);
			saleVerify(payment);
			existsOrError(reserve, messages.notFoundRegister);
			existsOrError(payment, messages.notFoundRegister);
		} catch (err) {
			return err;
		}

		const payProcess = await this.saleProcess(payment, item);
		try {
			saleVerify(payProcess);
		} catch (err) {
			return this.revertTicketsReservation(reserve, item)
				.then(res => (res ? err : res))
				.catch(err => err);
		}

		item.paymentStatus = payProcess.statusPagamento;
		onLog('Sale', item);

		return super
			.create(item)
			.then(res => {
				if (res.severity === 'ERROR') {
					return this.revertTicketsReservation(reserve, item)
						.then(revert => (revert ? res : revert))
						.catch(err => err);
				}

				return res;
			})
			.then(res => responseDataBaseCreate(res, item))
			.catch(err =>
				this.revertTicketsReservation(reserve, item)
					.then(res => (res ? err : res))
					.catch(err => err)
			);
	}

	read(options?: ReadSelesOptions) {
		if (options?.code) return this.findOneByWhere('code', options.code);
		if (options?.ticketId) return this.findAllByWhere('ticketId', options.ticketId);
		return super.read(options);
	}

	update(id: number, values: Sale) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAll(options?: ReadOptions) {
		const userId = Number(options?.userId);
		onLog('userId', userId);
		return super
			.findAllByUser(userId, options)
			.then(res => (!res || res instanceof DatabaseException ? res : this.setSales(res)))
			.catch(err => err);
	}

	findOneByWhere(column: string, value: any, options?: ReadOptions) {
		return super
			.findOneByWhere(column, value, options)
			.then(res => (!res || res instanceof DatabaseException ? res : new Sale(res)))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (!res || res instanceof DatabaseException ? res : new Sale(res)))
			.catch(err => err);
	}

	findAllByWhere(column: string, value: any, options?: ReadSelesOptions) {
		return super
			.findAllByWhere(column, value, options)
			.then(res => (!res || res instanceof DatabaseException ? res : res.map((s: ISale) => new Sale(s))))
			.catch(err => err);
	}

	async delete(id: number) {
		const fromDB = await this.findOneById(id);
		try {
			saleVerify(fromDB);
			existsOrError(fromDB, `Venda ${messages.notFoundRegister}`);
		} catch (err) {
			return err;
		}

		const ticketOfSale = await this.ticketService.findOneById(fromDB.ticketId);
		const payment = (await this.paymentService.findOneById(fromDB.paymentId)) || 'Pix payment';
		try {
			saleVerify(ticketOfSale);
			saleVerify(payment);
			existsOrError(ticketOfSale, messages.notFoundRegister);
			existsOrError(payment, messages.notFoundRegister);
		} catch (err) {
			return err;
		}

		const saleReturn = await this.saleCancelProcess(payment, fromDB);
		try {
			saleVerify(saleReturn);
		} catch (err) {
			return err;
		}

		fromDB.canceledAt = new Date();

		if (ticketOfSale.duration.start > fromDB.canceledAt) {
			return this.revertTicketsReservation(ticketOfSale, fromDB)
				.then(res =>
					res
						? this.update(fromDB.id, fromDB)
								.then(up => this.saleCanceled(up, fromDB))
								.catch(err => err)
						: res
				)
				.catch(err => err);
		}

		return this.update(fromDB.id, fromDB)
			.then(up => this.saleCanceled(up, fromDB))
			.catch(err => err);
	}

	private async reserveTickets(data: Sale) {
		const stockTicket = await this.ticketService.findOneById(data.ticketId);
		onLog('stockTicket', stockTicket);
		try {
			existsOrError(stockTicket, `${messages.notFoundRegister} Em ticket stock`);
			existsOrError(stockTicket.amount >= data.amount, messages.ticketSoldOut);
		} catch (err) {
			return new DatabaseException(err as string);
		}

		stockTicket.amount = stockTicket.amount - data.amount;
		const toSave = new Ticket(stockTicket);
		onLog('to save', toSave);

		return this.ticketService
			.save(toSave)
			.then(res => (!(res instanceof DatabaseException) ? toSave : res))
			.catch(err => err);
	}

	private saleProcess(pay: Payment, sale: Sale) {
		const params = this.setPayParams(pay);
		return this.payService
			.executePayment<CredCardPaymentModel | DebitCardPaymentModel | PixPaymentModel>(params, sale)
			.then(res => (res.statusPagamento !== 'Sucesso' ? new PaymentException(res.mensagem, res) : res))
			.catch(err => err);
	}

	private saleCancelProcess(pay: Payment, sale: Sale) {
		const params = this.setPayParams(pay);

		return this.payService
			.execCancelPayment<CredCardPaymentModel | DebitCardPaymentModel | PixPaymentModel>(params, sale)
			.then(res => (res.statusPagamento !== 'Sucesso' ? new PaymentException(res.mensagem, res) : res))
			.catch(err => err);
	}

	private async revertTicketsReservation(reservation: ITicket, data: Sale) {
		reservation.amount = reservation.amount + data.amount;
		const toSave = new Ticket(reservation);
		onLog('revert', toSave);

		return this.ticketService
			.save(toSave)
			.then(res => !(res instanceof DatabaseException) || res)
			.catch(err => err);
	}

	private setSales(value: List<ISale>) {
		const data = value.data.map(s => new Sale(s));
		return { ...value, data };
	}

	private saleCanceled(res: any, data: Sale) {
		if (!res) return res;
		if (res.severity === 'ERROR') return new DatabaseException(res.detail ? res.detail : messages.saleNoCancel(data.code), res);

		return { saleId: data.id, saleCode: data.code, cancel: res === 1, message: messages.canceledSaleSuccess, data };
	}

	private setPayParams(pay: Payment | string) {
		const isPayment = pay instanceof Payment;
		if (isPayment && pay.forma.toLowerCase() === 'debito') return new DebitCardPaymentModel(pay);
		if (isPayment && pay.forma.toLowerCase() === 'credito') return new CredCardPaymentModel(pay);

		return new PixPaymentModel(pay as string);
	}
}

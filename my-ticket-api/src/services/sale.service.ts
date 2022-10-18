import httpStatus from 'http-status';

import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ISale, ITicket, List, ReadOptions } from 'src/repositories/types';
import { Sale, Ticket } from 'src/repositories/entities';
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
import { CompleteSaleModel } from 'src/repositories/models';
import { TicketService } from 'src/services/ticket.service';
import { onLog } from 'src/core/handlers';

export class SaleService extends BaseService {
	constructor(options: BaseServiceOptions, private payService: PayService, private ticketService: TicketService) {
		super(options);
	}

	validate(data: ISale) {
		existsOrError(data.amount, messages.requires('Quantidade'));
		existsOrError(data.unitaryValue, messages.requires('Valor Unitario'));
	}

	async create(item: CompleteSaleModel) {
		const reserve = await this.reserveTickets(item.sale);
		try {
			saleVerify(reserve);
		} catch (err) {
			return err;
		}

		const payProcess = await this.saleProcess(item.payPrams, item.sale);
		try {
			saleVerify(payProcess);
		} catch (err) {
			return this.revertTicketsReservation(reserve, item.sale)
				.then(res => (res ? err : res))
				.catch(err => err);
		}

		item.sale.paymentStatus = payProcess.StatusPagamento;
		onLog('Sale', item.sale);

		return super
			.create(item.sale)
			.then(res => {
				if (res.severity === 'ERROR')
					return this.revertTicketsReservation(reserve, item.sale)
						.then(revert => (revert ? res : revert))
						.catch(err => err);

				return res;
			})
			.then(res => responseDataBaseCreate(res, item.sale))
			.catch(err =>
				this.revertTicketsReservation(reserve, item.sale)
					.then(res => (res ? err : res))
					.catch(err => err)
			);
	}

	update(id: number, values: Sale) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAll(options?: ReadOptions) {
		return super
			.findAll(options)
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

	findAllByWhere(column: string, value: any, fields: string[] = this.fields) {
		return super
			.findAllByWhere(column, value, fields)
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
		try {
			saleVerify(ticketOfSale);
			existsOrError(ticketOfSale, messages.notFoundRegister);
		} catch (err) {
			return err;
		}
		//
		// const saleReturn = await this.payService.execCancelPayment(params, fromDB);
		// try {
		// 	saleVerify(saleReturn);
		// } catch (err) {
		// 	return err;
		// }

		fromDB.canceledAt = new Date();

		if (ticketOfSale.duration.start > fromDB.canceledAt) {
			return this.revertTicketsReservation(ticketOfSale, fromDB)
				.then(res =>
					res
						? this.update(fromDB.id, fromDB)
								.then(up => this.saleCalceld(up, fromDB))
								.catch(err => err)
						: res
				)
				.catch(err => err);
		}

		return this.update(fromDB.id, fromDB)
			.then(up => this.saleCalceld(up, fromDB))
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

	private async saleProcess(data: PayParams, sale: Sale) {
		return this.payService
			.executePayment(data, sale)
			.then(res => (res.StatusPagamento !== 'Sucesso' ? new PaymentException(res.Mensagem, res) : res))
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

	private saleCalceld(res: any, data: Sale) {
		if (!res) return res;
		if (res.severity === 'ERROR') return new DatabaseException(res.detail ? res.detail : messages.saleNoCancel(data.code), res);

		return { saleId: data.id, saleCode: data.code, cancel: res === 1, message: messages.canceledSaleSuccess, data };
	}
}

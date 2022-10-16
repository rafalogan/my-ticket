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
	ResponseException,
	saleVerify,
} from 'src/utils';
import { PayService } from 'src/services/pay.service';
import { CompleteSaleModel, PayParams } from 'src/repositories/models';
import { TicketService } from 'src/services/ticket.service';

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

		return super
			.create(item.sale)
			.then(res => responseDataBaseCreate(res, item.sale))
			.catch(err => err);
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

	private async reserveTickets(data: Sale) {
		const stockTicket = await this.ticketService.findOneById(data.ticketId);
		try {
			existsOrError(stockTicket, `${messages.notFoundRegister} Em ticket stock`);
			existsOrError(stockTicket.amount >= data.amount, messages.ticketSoldOut);
		} catch (err) {
			return new DatabaseException(err as string);
		}

		stockTicket.amount = stockTicket.amount - data.amount;
		const toSave = new Ticket(stockTicket);

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

		return this.ticketService
			.save(toSave)
			.then(res => !(res instanceof DatabaseException) || res)
			.catch(err => err);
	}

	private setSales(value: List<ISale>) {
		const data = value.data.map(s => new Sale(s));
		return { ...value, data };
	}
}

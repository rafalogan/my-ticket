import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ISale, List, ReadOptions } from 'src/repositories/types';
import { Sale } from 'src/repositories/entities';
import { DatabaseException, existsOrError, messages, PaymentException, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';
import { PayService } from 'src/services/pay.service';
import { CompleteSaleModel } from 'src/repositories/models';
import httpStatus from 'http-status';

export class SaleService extends BaseService {
	constructor(options: BaseServiceOptions, private payService: PayService) {
		super(options);
	}

	validate(data: ISale) {
		existsOrError(data.amount, messages.requires('Quantidade'));
		existsOrError(data.unitaryValue, messages.requires('Valor Unitario'));
	}

	async create(item: CompleteSaleModel) {
		try {
			const payProcess = await this.payService.executePayment(item.payPrams, item.sale);
			if (payProcess.StatusPagamento !== 'Sucesso') return new PaymentException(payProcess.Mensagem, payProcess, httpStatus.FORBIDDEN);
		} catch (err) {
			return err;
		}

		return super
			.create(item.sale)
			.then(res => res)
			.then(res => {
				if (item.seats?.length) {
					return this.saveDataWithSeats(item.sale.ticketId, item.seats)
						.then(() => responseDataBaseCreate(res, item.sale))
						.catch(err => err);
				}

				return responseDataBaseCreate(res, item.sale);
			})
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

	private saveDataWithSeats(ticketId: number, seats: number[]) {
		const result = seats.map(seat => this.conn('seat_per_ticket').insert({ seat_address_id: seat, ticket_id: ticketId }));

		return Promise.all(result)
			.then(() => 'ok')
			.catch(err => err);
	}

	private setSales(value: List<ISale>) {
		const data = value.data.map(s => new Sale(s));
		return { ...value, data };
	}
}

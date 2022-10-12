import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, FindTicketOptions, ITicket, List, ReadOptions } from 'src/repositories/types';
import {
	DatabaseException,
	existsOrError,
	messages,
	responseDataBaseCreate,
	responseDataBaseUpdate,
	ticketOtherTableFields,
} from 'src/utils';
import { Ticket } from 'src/repositories/entities';
import { Pagination, TicketModel } from 'src/repositories/models';

export class TicketService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	validate(data: ITicket) {
		existsOrError(data.amount, messages.requires('Quantidade'));
		existsOrError(data.unitaryValue, messages.requires('Valor Unitário'));
		existsOrError(data.eventId, messages.requires('Evento'));
		existsOrError(data.placeId, messages.requires('Local'));
		existsOrError(data.theaterId, messages.requires('Sala/Espaço'));
		existsOrError(data.durationId, messages.requires('Duração'));
	}

	create(item: Ticket) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: Ticket) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findTicketsByEvent(id: number) {
		return this.conn({ t: this.table, e: 'events', p: 'places', th: 'theaters', d: 'durations' })
			.select(
				...this.fields.map(i => `t.${i}`),
				ticketOtherTableFields.event,
				ticketOtherTableFields.place,
				ticketOtherTableFields.theater,
				ticketOtherTableFields.duration
			)
			.whereRaw('e.id = ?', [id])
			.andWhereRaw('p.id = t.place_id')
			.andWhereRaw('th.id = t.theater_id')
			.andWhereRaw('d.id = t.duration_id')
			.then(res => {
				if (!res) return res;
				if (!Array.isArray(res)) return new DatabaseException(messages.notFoundRegister, res);
				return res.map(t => new TicketModel(t));
			})
			.catch(err => err);
	}

	async findAll(options?: ReadOptions) {
		const page = options?.page || 1;
		const limit = options?.limit || 10;
		const count = await this.countById();
		const pagination = new Pagination({ page, count, limit });

		return this.conn({ t: this.table, e: 'events', p: 'places', th: 'theaters', d: 'durations' })
			.select(
				...this.fields.map(i => `t.${i}`),
				ticketOtherTableFields.event,
				ticketOtherTableFields.place,
				ticketOtherTableFields.theater,
				ticketOtherTableFields.duration
			)
			.andWhereRaw('e.id = t.event_id')
			.andWhereRaw('p.id = t.place_id')
			.andWhereRaw('th.id = t.theater_id')
			.andWhereRaw('d.id = t.duration_id')
			.limit(limit)
			.offset(page * limit - limit)
			.orderBy(options?.order?.by || 'id', options?.order?.type || 'asc')
			.then(res => {
				if (!res) return res;
				if (!Array.isArray(res)) return new DatabaseException(messages.notFoundRegister, res);

				return { data: res.map(t => new TicketModel(t)), pagination };
			})
			.catch(err => err);
	}

	findOneById(id: number) {
		return this.conn({ t: this.table, e: 'events', p: 'places', th: 'theaters', d: 'durations' })
			.select(
				...this.fields.map(i => `t.${i}`),
				ticketOtherTableFields.event,
				ticketOtherTableFields.place,
				ticketOtherTableFields.theater,
				ticketOtherTableFields.duration
			)
			.whereRaw('t.id = ?', [id])
			.andWhereRaw('e.id = t.event_id')
			.andWhereRaw('p.id = t.place_id')
			.andWhereRaw('th.id = t.theater_id')
			.andWhereRaw('d.id = t.duration_id')
			.first()
			.then(res => {
				if (!res) return res;
				if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);
				return new TicketModel(res);
			})
			.catch(err => err);
	}

	private setTickets(value: List<ITicket>) {
		value.data = value.data.map(t => new Ticket(t));
		return value;
	}
}

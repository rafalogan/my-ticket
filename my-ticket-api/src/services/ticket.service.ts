import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ITicket, List, ReadOptions } from 'src/repositories/types';
import { DatabaseException, existsOrError, messages, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';
import { Ticket } from 'src/repositories/entities';

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

	findAll(options?: ReadOptions) {
		return super
			.findAll(options)
			.then(res => (res instanceof DatabaseException || res.status ? res : this.setTickets(res)))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (res instanceof DatabaseException || res.status ? res : new Ticket(res)))
			.catch(err => err);
	}

	private setTickets(value: List<ITicket>) {
		value.data = value.data.map(t => new Ticket(t));
		return value;
	}
}

import { ITicket, ITicketModel } from '../types';
import { TicketModel } from 'src/repositories/models';

export class Ticket {
	id?: number;
	amount: number;
	unitaryValue: number;
	eventId: number;
	placeId: number;
	theaterId: number;
	durationId: number;

	constructor(data: ITicket | TicketModel, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.amount = Number(data.amount);
		this.unitaryValue = Number(data.unitaryValue);
		this.eventId = 'event' in data ? Number(data.event.id) : Number(data.eventId);
		this.placeId = 'place' in data ? Number(data.place.id) : Number(data.placeId);
		this.theaterId = 'theater' in data ? Number(data.theater.id) : Number(data.theaterId);
		this.durationId = 'duration' in data ? Number(data.duration.id) : Number(data.durationId);
	}
}

import { ITicket } from '../types';

export class Ticket {
	id?: number;
	eventId: number;
	placeId: number;
	theaterId: number;
	durationId: number;
	amount: number;
	unitaryValue: number;

	constructor(data: ITicket, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.eventId = Number(data.eventId);
		this.placeId = Number(data.placeId);
		this.theaterId = Number(data.theaterId);
		this.durationId = Number(data.durationId);
		this.amount = Number(data.amount);
		this.unitaryValue = Number(data.unitaryValue);
	}
}

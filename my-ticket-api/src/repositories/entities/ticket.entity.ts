import { ITicket } from '../types';

export class Ticket {
	id?: number;
	amount: number;
	unitaryValue: number;
	eventId: number;
	placeId: number;
	theaterId: number;
	durationId: number;

	constructor(data: ITicket, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.amount = Number(data.amount);
		this.unitaryValue = Number(data.unitaryValue);
		this.eventId = Number(data.eventId);
		this.placeId = Number(data.placeId);
		this.theaterId = Number(data.theaterId);
		this.durationId = Number(data.durationId);
	}
}

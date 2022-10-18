import { IID } from './shared';

export interface ITicket extends IID {
	amount: number;
	unitaryValue: number;
	eventId: number;
	placeId: number;
	theaterId: number;
	durationId: number;
}

export interface FindTicketOptions {
	eventId: number;
	placeId: number;
	theaterId: number;
	durationId: number;
}

export interface ITicketModel extends ITicket {
	eventTitle: string;
	eventSubtitle: string;
	eventContent: string;
	eventType: string;
	placeName: string;
	placeDescription: string;
	theaterName: string;
	theaterDescription: string;
	durationStart: Date | string;
	durationEnd: Date | string;
}

export interface TicketTheater extends IID {
	name: string;
	description: string;
}

export interface TicketEvent extends IID {
	title: string;
	subtitle: string;
	content: string;
}

export interface TicketPlace extends IID {
	name: string;
	description: string;
}

export interface TicketDuration extends IID {
	start: Date | string;
	end: Date | string;
}

import { IID } from './shared';

export interface ITicket extends IID {
	code: string;
	amount: number;
	unitaryValue: number;
	eventId: number;
	placeId: number;
	theaterId: number;
	durationId: number;
}

import { IID } from './shared';

export interface ITicket extends IID {
	eventId: number;
	placeId: number;
	theaterId: number;
	durationId: number;
	amount: number;
	unitaryValue: number;
}

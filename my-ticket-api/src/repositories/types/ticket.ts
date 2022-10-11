import { IID } from './shared';

export interface ITicket extends IID {
	amount: number;
	unitaryValue: number;
	eventId: number;
	placeId: number;
	theaterId: number;
	durationId: number;
}

import { IID } from './shared';

export interface ISale extends IID {
	code?: string;
	discount?: number;
	amount: number;
	unitaryValue: number;
	total: number;
	userId: number;
	ticketId: number;
}

import { IID } from './shared';

export interface ISale extends IID {
	code?: string;
	discount?: number;
	amount: number;
	unitaryValue: number;
	total: number;
	paymentStatus: string;
	canceledAt?: Date | string;
	paymentId?: number;
	userId: number;
	ticketId: number;
}

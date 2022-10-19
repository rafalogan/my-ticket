import { IID } from './shared';
import { ReadOptions } from 'src/repositories/types/base';

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

export interface ReadSelesOptions extends ReadOptions {
	code?: string;
	ticketId?: number;
}

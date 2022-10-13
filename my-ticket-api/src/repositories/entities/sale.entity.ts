import { ISale } from '../types';
import { v4 } from 'uuid';

export class Sale {
	id?: number;
	code: string;
	discount: number;
	amount: number;
	unitaryValue: number;
	total: number;
	userId: number;

	constructor(data: ISale, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.code = data.code || v4();
		this.discount = Number(data.discount);
		this.amount = Number(data.amount);
		this.unitaryValue = Number(data.unitaryValue);
		this.total = Number(data.total);
		this.userId = Number(data.userId);
	}
}

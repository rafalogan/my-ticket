import { ISale } from '../types';
import { v4 } from 'uuid';

export class Sale {
	id?: number;
	code: string;
	discount?: number;
	amount: number;
	unitaryValue: number;
	total: number;
	userId: number;

	constructor(data: ISale, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.code = data.code || v4();
		this.discount = Number(data.discount) || undefined;
		this.amount = Number(data.amount);
		this.unitaryValue = Number(data.unitaryValue) * 100;
		this.total = Number(data.total) || this.setTotal();
		this.userId = Number(data.userId);
	}

	private setTotal() {
		const percent = this.discount ? this.discount / 100 : 0;
		const value = this.unitaryValue / 100;
		const discount = value * percent;
		const total = (value * this.amount - discount).toFixed(2);

		return Number(total) * 100;
	}
}

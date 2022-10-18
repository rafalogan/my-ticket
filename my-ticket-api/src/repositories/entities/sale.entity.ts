import { ISale } from '../types';
import { v4 } from 'uuid';
import { onLog } from 'src/core/handlers';
import { convertToDate } from 'src/utils';

export class Sale {
	id?: number;
	code: string;
	discount?: number;
	amount: number;
	unitaryValue: number;
	total: number;
	paymentStatus: string;
	paymentId: number;
	canceledAt?: Date;
	userId: number;
	ticketId: number;

	constructor(data: ISale, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.code = data.code || v4();
		this.discount = Number(data.discount) || undefined;
		this.amount = Number(data.amount);
		this.unitaryValue = Math.round(Number(data.unitaryValue) * 100);
		this.total = Number(data.total) || this.setTotal();
		this.paymentStatus = data.paymentStatus;
		this.canceledAt = data.canceledAt ? convertToDate(data.canceledAt) : undefined;
		this.userId = Number(data.userId);
		this.ticketId = Number(data.ticketId);
	}

	private setTotal() {
		const percent = this.discount ? this.discount / 100 : 0;
		const value = this.unitaryValue / 100;
		const discount = value * percent;
		const total = Number((value * this.amount - discount).toFixed(2));
		onLog('total raw', total);
		onLog('total parser', Math.round(total * 100));

		return Math.round(total * 100);
	}
}

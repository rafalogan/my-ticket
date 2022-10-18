import { Payment, Sale } from 'src/repositories/entities';
import { ICompleteSale, IPayment } from 'src/repositories/types';

export class CompleteSaleModel {
	payment: Payment;
	sale: Sale;

	constructor(data: ICompleteSale) {
		this.sale = data.sale instanceof Sale ? data.sale : new Sale(data.sale);
		this.payment = data.payment instanceof Payment ? data.payment : new Payment(data.payment);
	}
}

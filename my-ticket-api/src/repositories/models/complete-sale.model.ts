import { PayParams } from 'src/repositories/models/pay-params.model';
import { Sale } from 'src/repositories/entities';
import { ICompleteSale } from 'src/repositories/types';

export class CompleteSaleModel {
	payPrams: PayParams;
	sale: Sale;
	seats?: number[];

	constructor(data: ICompleteSale) {
		this.payPrams = new PayParams(data.payPrams);
		this.sale = new Sale(data.sale);
		this.seats = data.seats ? data.seats.map(Number) : undefined;
	}
}

import { IPayCard, IPayDebitCard, IPayment } from 'src/repositories/types';
import { Payment } from 'src/repositories/entities';
import { setCard } from 'src/utils';

export class DebitCardPaymentModel implements IPayDebitCard {
	forma: string;
	instituicao: string;
	cartaoDebito: IPayCard;

	constructor(data: IPayment | Payment) {
		this.forma = data.forma;
		this.instituicao = data.instituicao as string;
		this.cartaoDebito = setCard(data);
	}
}

import { IPayCard, IPayCredtCrad, IPayment, IPayPortador } from 'src/repositories/types';
import { Payment } from 'src/repositories/entities';
import { setCard } from 'src/utils';

export class CredCardPaymentModel implements IPayCredtCrad {
	forma: string;
	instituicao: string;
	parcelas: string;
	cartaoCredito: IPayCard;

	constructor(data: IPayment | Payment) {
		this.forma = data.forma;
		this.instituicao = data.instituicao as string;
		this.parcelas = '1';
		this.cartaoCredito = setCard(data);
	}
}

import { IPay, IPayCard } from 'src/repositories/types';

export class PayParams {
	Forma: string;
	Instituicao: string;
	Parcelas: string;
	CartaoCredito: IPayCard;

	constructor(data: IPay) {
		Object.assign(this, data);
	}
}

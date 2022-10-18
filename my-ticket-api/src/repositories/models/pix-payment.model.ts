import { IPayPix, ISale } from 'src/repositories/types';

export class PixPaymentModel implements IPayPix {
	forma: string;
	codigo: string;

	constructor(data: ISale, forma: string) {
		this.forma = forma;
		this.codigo = data.pixCode as string;
	}
}

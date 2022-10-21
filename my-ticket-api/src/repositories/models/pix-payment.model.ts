import { v4 } from 'uuid';

import { IPayPix, ISale } from 'src/repositories/types';

export class PixPaymentModel implements IPayPix {
	forma: string;
	codigo: string;

	constructor(forma: string) {
		this.forma = forma;
		this.codigo = `${this.forma}.${v4}.${Date.now()}`;
	}
}

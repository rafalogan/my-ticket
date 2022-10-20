import { IID, ReadOptions } from 'src/repositories/types';

export interface IContact extends IID {
	name: string;
	email: string;
	subject: string;
	phone?: string;
	message: string;
	saleId?: number;
}

export interface ReadContactOptions extends ReadOptions {
	saleId?: number;
}

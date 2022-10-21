import { IID } from 'src/repositories/types/shared';
import { ReadOptions } from 'src/repositories/types/base';

export interface IPlace extends IID {
	name: string;
	description: string;
	zipCode: string;
	phone: string;
	street: string;
	number: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	urlMaps: string;
	userId?: number;
}

export interface PlaceReadOptions extends ReadOptions {
	userId?: number;
}

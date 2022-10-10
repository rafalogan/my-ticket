import { IID } from './shared';

export interface ICapacity extends IID {
	section?: string;
	row?: string;
	places: number;
	theaterId: number;
}

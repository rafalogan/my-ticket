import { IID } from './shared';

export interface ICapacity extends IID {
	theaterId: number;
	section: string;
	row: string;
	places: number;
}

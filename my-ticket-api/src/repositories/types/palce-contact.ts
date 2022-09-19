import { IID } from './shared';

export interface IPlaceContact extends IID {
	placeId: number;
	type: string;
	value: string;
}

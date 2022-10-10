import { IID } from './shared';

export interface IPlaceContact extends IID {
	placeId: number;
	value: string;
	type: string;
}

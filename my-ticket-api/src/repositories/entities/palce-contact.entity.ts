import { IPlaceContact } from 'src/repositories/types';

export class PlaceContact {
	id?: number;
	placeId: number;
	value: string;
	type: string;

	constructor(data: IPlaceContact, id?: number) {}
}

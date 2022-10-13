import { IID } from './shared';

export interface ITheater extends IID {
	name: string;
	description?: string;
	sectionsNumber?: number;
	sectionsType?: string;
	rawsPerSection?: number;
	rowsType?: string;
	capacity: number;
	addressedSeats: boolean;
	placeId: number;
}

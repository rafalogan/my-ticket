import { ITheater } from '../types';

export class Theater {
	id?: number;
	name: string;
	description?: string;
	sectionsNumber?: number;
	sectionsType?: string;
	rawsPerSection?: number;
	rowsType?: string;
	capacity: number;
	addressedSeats: boolean;
	placeId: number;

	constructor(data: ITheater, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.name = data.name;
		this.description = data.description ? data.description.toString() : undefined;
		this.sectionsNumber = Number(data.sectionsNumber);
		this.sectionsType = data.sectionsType;
		this.rawsPerSection = Number(data.sectionsType);
		this.rowsType = data.rowsType;
		this.capacity = Number(data.rawsPerSection);
		this.addressedSeats = data.addressedSeats || false;
		this.placeId = Number(data.placeId);
	}
}

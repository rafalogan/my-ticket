import { ICapacity } from '../types';

export class Capacity {
	id?: number;
	section?: string;
	row?: string;
	places: number;
	theaterId: number;

	constructor(data: ICapacity, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.section = data.section;
		this.row = data.row;
		this.places = Number(data.places);
		this.theaterId = Number(data.theaterId);
	}
}

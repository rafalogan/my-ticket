import { ITheater } from '../types';

export class Theater {
	id?: number;
	name: string;
	description?: string;
	placeId: number;

	constructor(data: ITheater, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.name = data.name;
		this.description = data.description || undefined;
		this.placeId = Number(data.placeId);
	}
}

import { IPlace } from 'src/repositories/types';

export class Place {
	id?: number;
	name: string;
	description: string;
	userId?: number;

	constructor(data: IPlace, id?: number) {
		this.id = id ? Number(id) : data.id;
		this.name = data.name;
		this.description = data.description.toString();
		this.userId = Number(data.userId);
	}
}

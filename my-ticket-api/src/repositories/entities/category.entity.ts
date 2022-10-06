import { ICategory } from '../types';

export class Category {
	id: number;
	name: string;
	description: string;
	url: string;
	parentId: number;

	constructor(data: ICategory, id?: number) {
		Object.assign(this, data);

		this.id = Number(id || data.id);
		this.parentId = Number(data.parentId);
	}
}

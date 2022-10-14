import { ICategory } from '../types';

export class Category {
	id: number;
	name: string;
	description?: string;
	url?: string;
	status: boolean;
	parentId?: number;
	userId?: number;

	constructor(data: ICategory, id?: number) {
		this.id = Number(id || data.id);
		this.name = data.name;
		this.description = data.description;
		this.url = data.url;
		this.parentId = Number(data.parentId);
		this.userId = Number(data.userId);
	}
}

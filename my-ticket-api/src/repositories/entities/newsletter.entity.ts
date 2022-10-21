import { INewsletter } from '../types';

export class Newsletter {
	id?: number;
	name?: string;
	email: string;
	active: boolean;

	constructor(data: INewsletter, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.name = data.name;
		this.email = data.email;
		this.active = data.active;
	}
}

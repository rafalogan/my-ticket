import { IPhone } from 'src/repositories/types';

export class Phone {
	id?: number;
	type: string;
	number: string;
	userId?: number;
	placeId?: number;

	constructor(data: IPhone, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.type = data.type;
		this.number = data.number;
		this.userId = Number(data.userId) || undefined;
		this.placeId = Number(data.placeId) || undefined;
	}
}

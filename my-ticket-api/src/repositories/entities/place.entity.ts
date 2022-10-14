import { IPlace } from 'src/repositories/types';

export class Place {
	id?: number;
	name: string;
	description: string;
	phone: string;
	zipCode: string;
	street: string;
	number: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	urlMaps: string;
	userId: number;

	constructor(data: IPlace, id?: number) {
		this.id = id ? Number(id) : data.id;
		this.name = data.name;
		this.description = data.description.toString();
		this.phone = data.phone;
		this.zipCode = data.zipCode;
		this.street = data.street;
		this.number = data.number;
		this.complement = data.complement;
		this.district = data.district;
		this.city = data.city;
		this.state = data.state;
		this.urlMaps = data.urlMaps;
		this.userId = Number(data.userId);
	}
}

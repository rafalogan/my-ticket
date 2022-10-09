import { IAddress } from 'src/repositories/types';

export class Address {
	id?: number;
	main: boolean;
	zipCode: string;
	street: string;
	number?: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	urlMaps?: string;
	placeId?: number;
	userId?: number;

	constructor(data: IAddress, id?: number) {
		this.id = Number(id);
		this.zipCode = data.zipCode;
		this.main = data.main;
		this.street = data.street;
		this.number = data.number;
		this.complement = data.complement;
		this.district = data.district;
		this.city = data.city;
		this.state = data.state;
		this.urlMaps = data.urlMaps;
		this.placeId = Number(data.placeId);
		this.userId = Number(data.userId);
	}
}

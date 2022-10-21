import { IAddress, IPlace } from '../types';
import { Place } from 'src/repositories/entities';

export class PlaceModel {
	id: number;
	name: string;
	description: string;
	phone: string;
	address: IAddress;
	userId: number;

	constructor(data: IPlace | Place) {
		this.id = Number(data.id);
		this.name = data.name;
		this.description = data.description.toString();
		this.phone = data.phone;
		this.address = this.setAddress(data);
		this.userId = Number(data.userId);
	}

	private setAddress = (value: IPlace): IAddress => ({
		zipCode: value.zipCode,
		street: value.street,
		number: value.number,
		complement: value.complement,
		district: value.district,
		city: value.city,
		state: value.state,
		urlMaps: value.urlMaps,
	});
}

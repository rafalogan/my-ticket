import { IUser, IUserModel } from 'src/repositories/types';
import { convertToDate, deleteField } from 'src/utils';
import { profile } from 'winston';

export class User {
	id?: number;
	firstName: string;
	lastName: string;
	cpf: string;
	phone?: string;
	email: string;
	password: string;
	zipCode: string;
	street: string;
	number: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	profileId: number;
	deletedAt?: Date;

	constructor(data: IUser | IUserModel, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.cpf = data.cpf;
		this.phone = data.phone;
		this.email = data.email;
		this.password = data.password;
		this.zipCode = data.zipCode;
		this.street = data.street;
		this.number = data.number;
		this.complement = data.complement;
		this.district = data.district;
		this.city = data.city;
		this.state = data.state;
		this.profileId = Number(data.profileId);
		this.deletedAt = data.deletedAt ? convertToDate(data.deletedAt) : undefined;
	}
}

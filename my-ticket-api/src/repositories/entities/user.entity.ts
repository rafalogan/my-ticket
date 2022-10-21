import { IUser, IUserModel } from 'src/repositories/types';
import { convertToDate, deleteField } from 'src/utils';
import { profile } from 'winston';
import { UserModel } from 'src/repositories/models';

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
	number?: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	profileId: number;
	deletedAt?: Date;

	constructor(data: IUser | IUserModel | UserModel, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.cpf = data.cpf;
		this.phone = data.phone;
		this.email = data.email;
		this.password = data.password;
		this.zipCode = 'address' in data ? data.address.zipCode : data.zipCode;
		this.street = 'address' in data ? data.address.street : data.street;
		this.number = 'address' in data ? data.address.number : data.number;
		this.complement = 'address' in data ? data.address.complement : data.complement;
		this.district = 'address' in data ? data.address.district : data.district;
		this.city = 'address' in data ? data.address.city : data.city;
		this.state = 'address' in data ? data.address.state : data.state;
		this.profileId = 'profile' in data ? Number(data.profile.id) : Number(data.profileId);
		this.deletedAt = data.deletedAt ? convertToDate(data.deletedAt) : undefined;
	}
}

import { CustomProfile, IAddress, IUserModel } from 'src/repositories/types';
import { convertToDate } from 'src/utils';

export class UserModel {
	id?: number;
	firstName: string;
	lastName: string;
	cpf: string;
	email: string;
	phone?: string;
	password: string;
	address: IAddress;
	profile: CustomProfile;
	deletedAt?: Date;

	constructor(data: IUserModel) {
		this.id = Number(data.id) || undefined;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.cpf = data.cpf;
		this.email = data.email;
		this.password = data.password;
		this.address = this.setAddress(data);
		this.profile = this.setProfile(data);
		this.deletedAt = data.deletedAt ? convertToDate(data.deletedAt) : undefined;
	}

	private setAddress = (data: IUserModel): IAddress => ({
		zipCode: data.zipCode,
		street: data.street,
		number: data.number,
		complement: data.complement,
		district: data.district,
		city: data.city,
		state: data.state,
	});

	private setProfile = (data: IUserModel): CustomProfile => ({
		id: Number(data.profileId),
		name: data.profileName,
		description: data.profileDescription,
	});
}

import { IProfile, IUserModel } from 'src/repositories/types';

export class UserModel {
	id?: number;
	firstName: string;
	lastName: string;
	cpf: string;
	email: string;
	password: string;
	profile: IProfile;
	deletedAt?: Date;

	constructor(data: IUserModel) {
		Object.assign(this, data);

		this.id = Number(data.id) || undefined;
		this.profile.id = Number(data.profile.id) || undefined;
	}
}

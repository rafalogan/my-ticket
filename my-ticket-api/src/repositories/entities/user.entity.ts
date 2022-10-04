import { IUser, IUserModel } from 'src/repositories/types';
import { deleteField } from 'src/utils';

export class User {
	id: number;
	firstName: string;
	lastName: string;
	cpf: string;
	email: string;
	password: string;
	profileId: number;
	deletedAt?: Date;

	constructor(data: IUser | IUserModel, id?: number) {
		Object.assign(this, data);

		this.id = id ? Number(id) : this.id;
		this.profileId = this.setProfileId(data);

		deleteField(this, 'profile');
	}

	private setProfileId(data: IUser | IUserModel) {
		if ('profile' in data) {
			return Number(data.profile.id);
		}

		return Number(data.profileId);
	}
}

import { CustomProfile, CustomUserModel, IProfile } from 'src/repositories/types';

export class UserModel {
	id?: number;
	firstName: string;
	lastName: string;
	cpf: string;
	email: string;
	password: string;
	profile: CustomProfile;
	deletedAt?: Date;

	constructor(data: CustomUserModel) {
		this.id = Number(data.id) || undefined;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.cpf = data.cpf;
		this.email = data.email;
		this.password = data.password;
		this.profile = this.setProfile(data);
		this.deletedAt = data.deletedAt;
	}

	private setProfile(data: CustomUserModel): CustomProfile {
		const { profileId, profileName, profileDescription } = data;

		return { id: profileId, name: profileName, description: profileDescription };
	}
}

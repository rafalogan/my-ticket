import { BaseServiceOptions } from 'src/repositories/types/base';
import { IProfile } from './profile';

export interface IUser {
	id?: number;
	firstName: string;
	lastName: string;
	cpf: string;
	email: string;
	password: string;
	confirmPassword?: string;
	profileId: number;
	deletedAt?: Date;
}

export interface UserServiceOptions extends BaseServiceOptions {
	salt: number;
}

export interface IUserModel extends IUser {
	profile: IProfile;
}

export interface UpdatePasswordOptions {
	email: string;
	oldPassword: string;
	password: string;
	confirmPassword: string;
}

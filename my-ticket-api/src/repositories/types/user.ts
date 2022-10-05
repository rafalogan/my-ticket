import { BaseServiceOptions } from 'src/repositories/types/base';
import { CustomProfile, IProfile } from './profile';
import { RouteOptions } from './route';
import { UserService } from 'src/services';

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
	profile: CustomProfile;
}

export interface UpdatePasswordOptions {
	email: string;
	oldPassword: string;
	password: string;
	confirmPassword: string;
}

export interface CustomUserModel {
	id: number;
	firstName: string;
	lastName: string;
	cpf: string;
	email: string;
	password: string;
	profileId: number;
	deletedAt?: Date;
	profileName: string;
	profileDescription: string;
}

export interface UserModuleOptions extends RouteOptions {
	service: UserService;
}

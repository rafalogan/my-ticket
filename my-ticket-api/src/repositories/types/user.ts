import { BaseServiceOptions } from 'src/repositories/types/base';
import { CustomProfile, IProfile } from './profile';
import { RouteOptions } from './route';
import { UserService } from 'src/services';
import { User } from '../entities';
import { Pagination } from 'src/repositories/models';
import { IID } from 'src/repositories/types/shared';
import { IAddress } from 'src/repositories/types/adress';

export interface IUser extends IID {
	firstName: string;
	lastName: string;
	cpf: string;
	phone?: string;
	email: string;
	password: string;
	confirmPassword?: string;
	zipCode: string;
	street: string;
	number: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	profileId: number;
	deletedAt?: Date;
}

export interface UserServiceOptions extends BaseServiceOptions {
	salt: number;
}

export interface IUserModel extends IUser {
	profileName: string;
	profileDescription: string;
	profileActive?: boolean;
}

export interface UpdatePasswordOptions {
	email: string;
	oldPassword: string;
	password: string;
	confirmPassword: string;
}

export interface UserModuleOptions extends RouteOptions {
	service: UserService;
}

export interface Users {
	data: IUser[] | User[];
	pagination: Pagination;
}

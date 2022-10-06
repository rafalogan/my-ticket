import { ProfileService } from 'src/services';
import { RouteOptions } from 'src/repositories/types/route';
import { Profile } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';

export interface IProfile {
	id?: number;
	name: string;
	description: string;
	active: boolean;
}

export interface CustomProfile {
	id?: number;
	name: string;
	description: string;
	active?: boolean;
}

export interface ProfileModuleOptions extends RouteOptions {
	service: ProfileService;
}

export interface Profiles {
	data: IProfile[] | Profile[];
	pagination: Pagination;
}

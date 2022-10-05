import { ProfileService } from 'src/services';
import { RouteOptions } from 'src/repositories/types/route';

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

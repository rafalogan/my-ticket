import { RouteOptions } from 'src/repositories/types/route';

export interface ModuleOptions<T> extends RouteOptions {
	service: T;
}

import { Routes } from 'src/core/routes/routes';
import { RouteOptions } from 'src/repositories/types';

export class AuthRoute extends Routes {
	constructor(options: RouteOptions) {
		super(options.app, options.auth);
	}

	exec() {}
}

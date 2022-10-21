import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class newsletterRoute extends Routes {
constructor(options: RouteOptions, private newsletterController:) {
	super(options.app, options.auth);
}

exec() {}
}

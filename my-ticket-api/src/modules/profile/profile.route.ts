import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { ProfileController } from './profile.controller';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class ProfileRoute extends Routes {
	constructor(options: RouteOptions, private profileController: ProfileController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/profiles')
			.all(this.auth?.exec().authenticate())
			.get(this.profileController.list.bind(this.profileController))
			.post(this.profileController.save.bind(this.profileController))
			.all(methodNotAllowed);

		this.app
			.route('/profiles/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.profileController.list.bind(this.profileController))
			.put(this.profileController.edit.bind(this.profileController))
			.delete(this.profileController.remove.bind(this.profileController))
			.all(methodNotAllowed);
	}
}

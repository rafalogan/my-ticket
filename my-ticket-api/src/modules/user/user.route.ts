import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { UserController } from './user.controller';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class UserRoute extends Routes {
	constructor(options: RouteOptions, private userController: UserController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/users')
			.all(this.auth?.exec().authenticate())
			.get(this.userController.list.bind(this.userController))
			.post(this.userController.save.bind(this.userController))
			.all(methodNotAllowed);

		this.app
			.route('/user/update-password')
			.all(this.auth?.exec().authenticate())
			.post(this.userController.updatePassword.bind(this.userController))
			.all(methodNotAllowed);

		this.app
			.route('/users/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.userController.list.bind(this.userController))
			.put(this.userController.edit.bind(this.userController))
			.delete(this.userController.remove.bind(this.userController))
			.all(methodNotAllowed);
	}
}

import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { AuthController } from 'src/modules/auth/auth.controller';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class AuthRoute extends Routes {
	constructor(options: RouteOptions, private authController: AuthController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app.route('/signin').post(this.authController.signin.bind(this.authController)).all(methodNotAllowed);
		this.app.route('/signup').post(this.authController.signup.bind(this.authController)).all(methodNotAllowed);
		this.app.route('/validate-token').get(this.authController.validateToken.bind(this.authController)).all(methodNotAllowed);
	}
}

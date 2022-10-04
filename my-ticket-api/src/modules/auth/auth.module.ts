import { CommonModule } from 'src/core/abstracts';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthRoute } from 'src/modules/auth/auth.route';
import { AuthModuleOptions } from 'src/repositories/types';

export class AuthModule extends CommonModule {
	private readonly authController: AuthController;
	private authRoute: AuthRoute;

	constructor(options: AuthModuleOptions) {
		super();

		this.authController = new AuthController(options.service);
		this.authRoute = new AuthRoute({ ...options }, this.authController);
	}

	exec() {
		return this.authRoute.exec();
	}
}

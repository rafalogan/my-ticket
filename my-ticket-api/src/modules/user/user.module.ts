import { CommonModule } from 'src/core/abstracts';
import { UserController } from 'src/modules/user/user.controller';
import { UserRoute } from 'src/modules/user/user.route';
import { UserModuleOptions } from 'src/repositories/types';

export class UserModule extends CommonModule {
	userController: UserController;
	userRoute: UserRoute;

	constructor(options: UserModuleOptions) {
		super();

		this.userController = new UserController(options.service);
		this.userRoute = new UserRoute({ ...options }, this.userController);
	}

	exec() {
		return this.userRoute.exec();
	}
}

import { CommonModule } from 'src/core/abstracts';
import { UserController } from 'src/modules/user/user.controller';
import { UserRoute } from 'src/modules/user/user.route';
import { ModuleOptions } from 'src/repositories/types';
import { UserService } from 'src/services';

export class UserModule extends CommonModule {
	private readonly userController: UserController;
	private userRoute: UserRoute;

	constructor(options: ModuleOptions<UserService>) {
		super();

		this.userController = new UserController(options.service);
		this.userRoute = new UserRoute({ ...options }, this.userController);
	}

	exec = () => this.userRoute.exec();
}

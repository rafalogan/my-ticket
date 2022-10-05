import { CommonModule } from 'src/core/abstracts';
import { ProfileModuleOptions } from 'src/repositories/types';
import { ProfileController } from 'src/modules/profile/profile.controller';
import { ProfileRoute } from 'src/modules/profile/profile.route';

export class ProfileModule extends CommonModule {
	private readonly profileController: ProfileController;
	private profileRoute: ProfileRoute;

	constructor(options: ProfileModuleOptions) {
		super();

		this.profileController = new ProfileController(options.services);
		this.profileRoute = new ProfileRoute({ ...options }, this.profileController);
	}

	exec() {
		return this.profileRoute.exec();
	}
}

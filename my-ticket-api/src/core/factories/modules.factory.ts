import { Application } from 'express';
import { ServicesFactory } from 'src/core/factories/services.factory';
import { AuthModule } from 'src/modules/auth';
import { UserModule } from 'src/modules/user';
import { IAuthConfig, RouteOptions } from 'src/repositories/types';
import { notfoundRoute } from 'src/core/routes/notfound.route';
import { AuthConfig } from 'src/config';
import { ProfileModule } from 'src/modules/profile';

export class ModulesFactory {
	private authModule: AuthModule;
	private userModule: UserModule;
	private profileModule: ProfileModule;

	constructor(private app: Application, private auth: AuthConfig, services: ServicesFactory) {
		this.authModule = new AuthModule({ service: services.authService, ...this.getRouteOptions() });
		this.userModule = new UserModule({ service: services.userService, ...this.getRouteOptions() });
		this.profileModule = new ProfileModule({ service: services.profileService, ...this.getRouteOptions() });
	}

	exec() {
		this.authModule.exec();
		this.userModule.exec();
		this.profileModule.exec();
		this.app.use(notfoundRoute);
	}

	private getRouteOptions(): RouteOptions {
		return { app: this.app, auth: this.auth };
	}
}

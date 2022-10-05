import { Application } from 'express';
import { AuthConfig } from 'src/config';
import { notfoundRoute } from 'src/core/routes/notfound.route';
import { ServicesFactory } from 'src/core/factories/services.factory';
import { AuthModule } from 'src/modules/auth';
import { UserModule } from 'src/modules/user';
import { RouteOptions } from 'src/repositories/types';

export class ModulesFactory {
	private authModule: AuthModule;
	private userModule: UserModule;
	constructor(private app: Application, private auth: AuthConfig, services: ServicesFactory) {
		this.authModule = new AuthModule({ service: services.authService, ...this.getRouteOptions() });
		this.userModule = new UserModule({ service: services.userService, ...this.getRouteOptions() });
	}

	exec() {
		this.authModule.exec();
		this.userModule.exec();
		this.app.use(notfoundRoute);
	}

	private getRouteOptions(): RouteOptions {
		return { app: this.app, auth: this.auth.exec() };
	}
}

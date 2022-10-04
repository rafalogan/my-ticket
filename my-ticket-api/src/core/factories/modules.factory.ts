import { Application } from 'express';
import { AuthConfig } from 'src/config';
import { notfoundRoute } from 'src/core/routes/notfound.route';
import { ServicesFactory } from 'src/core/factories/services.factory';
import { AuthModule } from 'src/modules/auth';

export class ModulesFactory {
	private authModule: AuthModule;
	constructor(private app: Application, private auth: AuthConfig, services: ServicesFactory) {
		this.authModule = new AuthModule({ service: services.authService, app, auth });
	}

	exec() {
		this.authModule.exec();
		this.app.use(notfoundRoute);
	}
}

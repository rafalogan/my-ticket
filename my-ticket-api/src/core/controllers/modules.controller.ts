import { Application } from 'express';
import { AuthConfig } from 'src/config';
import { notfoundRoute } from 'src/core/routes/notfound.route';

export class ModulesController {
	constructor(private app: Application, private auth: AuthConfig) {}

	exec() {
		this.app.use(notfoundRoute);
	}
}

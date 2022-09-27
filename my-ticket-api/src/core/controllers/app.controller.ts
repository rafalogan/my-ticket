import { ServerController } from 'src/core/controllers/server.controller';

export class App {
	constructor(private server: ServerController) {}

	init() {
		return this.server.exec();
	}
}

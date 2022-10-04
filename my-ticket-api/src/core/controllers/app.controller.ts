import { ServerController } from 'src/core/controllers/server.controller';

import { onError } from 'src/core/handlers';
import { CacheService, DatabaseService } from 'src/core/service';

export class App {
	constructor(private server: ServerController, private databaseService: DatabaseService, private cacheService: CacheService) {}

	init() {
		return this.databaseService
			.isConnected()
			.then(() => this.databaseService.latest())
			.then(() => this.cacheService.isConnect())
			.then(() => this.server.exec())
			.catch(err => onError('Falha ao inicar o Servidor', err));
	}
}

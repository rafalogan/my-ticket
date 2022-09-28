import http from 'http';
import https from 'https';
import { Application } from 'express';

import { Environment } from 'src/config';
import { onError, onHttp, onLog } from 'src/core/handlers';
import { TERMINAL_COLORS } from 'src/utils';
import { InitService } from 'src/services';

const { green, reset } = TERMINAL_COLORS;

export class ServerController {
	private server?: https.Server | http.Server;

	constructor(private express: Application, private env: Environment, private initService: InitService) {}

	exec() {
		return this.env.https.enable ? this.createHttpsServer() : this.createHttpServer();
	}

	private createHttpServer() {
		this.server = http
			.createServer(this.express)
			.listen(this.env.port)
			.on('listening', this.onServerUp.bind(this))
			.on('error', this.onServerError.bind(this));
	}

	private createHttpsServer() {
		const options = this.initService.getOptions(this.env.https);

		this.server = https
			.createServer(options, this.express)
			.listen(this.env.port)
			.on('listening', this.onServerUp.bind(this))
			.on('error', this.onServerError.bind(this));
	}

	private onServerUp() {
		const prefix = this.env.https.enable ? 'https' : 'http';
		const { host, port } = this.env;

		return onHttp('Server is up and running on:', `${green}${prefix}://${host}:${port}${reset}`);
	}

	private onServerError(error: NodeJS.ErrnoException) {
		return onError(`ERROR: On Server Inti: ${__filename}`, error);
	}
}

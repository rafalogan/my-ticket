import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Logger } from 'winston';

import { ICorsOptions } from 'src/repositories/types';
import { AuthConfig } from 'src/config/auth.config';
import { ModulesFactory } from 'src/core/factories';
import { ServicesFactory } from 'src/core/factories/services.factory';

export class AppConfig {
	private readonly _express: Application;
	private modules: ModulesFactory;

	constructor(
		private env: string,
		private corsOptions: ICorsOptions,
		private logger: Logger,
		private auth: AuthConfig,
		private services: ServicesFactory
	) {
		this._express = express();
		this.modules = new ModulesFactory(this.express, this.auth, this.services);
		this.configExpress();
	}

	get express() {
		return this._express;
	}

	configExpress() {
		this.express.use(cors(this.corsOptions));
		this.express.use(this.morganConfig());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
		this.modules.exec();
	}

	private morganConfig() {
		const format = this.env === 'development' || this.env === 'test' ? 'dev' : 'combined';
		const stream = {
			write: (message: string) => this.logger.info(message.trim()),
		};

		return morgan(format, { stream });
	}
}

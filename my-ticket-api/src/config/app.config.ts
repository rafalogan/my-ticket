import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Logger } from 'winston';

import { ICorsOptions } from 'src/repositories/types';

export class AppConfig {
	private readonly _express: Application;

	constructor(private env: string, private corsOptions: ICorsOptions, private logger: Logger) {
		this._express = express();

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
		this.initApi();
	}

	private morganConfig() {
		const format = this.env === 'development' || this.env === 'test' ? 'dev' : 'combined';
		const stream = {
			write: (message: string) => this.logger.info(message.trim()),
		};

		return morgan(format, { stream });
	}

	private initApi() {}
}

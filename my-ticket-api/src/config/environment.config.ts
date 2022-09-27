import { IAWS, ICache, ICorsOptions, IDatabase, IHttps, ISecurity } from 'src/repositories/types';

export class Environment {
	private readonly _nodeEnv: string;
	private readonly _port: number;
	private readonly _host: string;
	private readonly _storage: string;
	private readonly _timezone: string;
	private readonly _database: IDatabase;
	private readonly _corsOptions: ICorsOptions;
	private readonly _cache: ICache;
	private readonly _aws: IAWS;
	private readonly _https: IHttps;
	private readonly _security: ISecurity;

	constructor() {
		this._nodeEnv = process.env.NODE_ENV || '';
		this._port = Number(process.env.PORT);
		this._host = process.env.HOST || '';
		this._storage = process.env.STORAGE_TYPE || '';
		this._timezone = process.env.TIMEZONE || '';
		this._database = this.setDatabase();
		this._corsOptions = this.setCorsOptios();
		this._cache = this.setCache();
		this._aws = this.setAWS();
		this._https = this.setHttp();
		this._security = this.setSeularity();
	}

	get nodeEnv() {
		return this._nodeEnv;
	}
	get port() {
		return this._port;
	}
	get host() {
		return this._host;
	}
	get storage() {
		return this._storage;
	}
	get timezone() {
		return this._timezone;
	}
	get database() {
		return this._database;
	}
	get cache() {
		return this._cache;
	}
	get aws() {
		return this._aws;
	}
	get https() {
		return this._https;
	}
	get security() {
		return this._security;
	}
	get corsOptions() {
		return this._corsOptions;
	}

	private setDatabase(): IDatabase {
		const client = process.env.DB_CLIENT || '';
		const host = process.env.DB_HOST || '';
		const name = process.env.DB_NAME || '';
		const password = process.env.DB_PASSWORD || '';
		const port = Number(process.env.DB_PORT);

		return { client, host, name, password, port };
	}

	private setCorsOptios(): ICorsOptions {
		const origin = process.env.CORS_ORIGIN || '*';
		const methods = process.env.CORS_METHOD || 'GET,HEAD,PUT,PATCH,POST,DELETE';
		const preflightContinue = process.env.CORS_PREFLIGHTCONTIME === 'true';
		const optionsSuccessStatus = Number(process.env.CORS_OPTIONSSUCCESSSTATUS) || 204;

		return { origin, methods, preflightContinue, optionsSuccessStatus };
	}

	private setCache(): ICache {
		const enable = process.env.CACHE_ENABLE === 'true';
		const time = Number(process.env.CACHE_TIME);
		const host = process.env.REDISHOST || '';
		const port = Number(process.env.REDISPORT);

		return { enable, time, host, port };
	}

	private setAWS(): IAWS {
		const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
		const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
		const region = process.env.AWS_REGION || '';
		const bucket = process.env.AWS_BUCKET || '';

		return { accessKeyId, secretAccessKey, region, bucket };
	}

	private setHttp(): IHttps {
		const enable = process.env.ENABLE_HTTPS === 'true';
		const certFilePath = process.env.CERT_FILE || '';
		const keyFilePath = process.env.KEY_FILE || '';

		return { enable, certFilePath, keyFilePath };
	}

	private setSeularity(): ISecurity {
		const saltRounds = Number(process.env.SALT_ROUNDS);
		const authsecret = process.env.AUTHSECRET || '';

		return { saltRounds, authsecret };
	}
}

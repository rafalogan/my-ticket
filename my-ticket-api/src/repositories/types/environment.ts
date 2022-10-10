export interface IEnvironment {
	nodeEnv: string;
	port: number;
	host: string;
	storage: string;
	timezone?: string;
	database: IDatabase;
	corsOptions: ICorsOptions;
	cache: ICache;
	aws: IAWS;
	https: IHttps;
	security: ISecurity;
}

export interface IDatabase {
	client: string;
	host: string;
	database: string;
	user: string;
	password: string;
	port: number;
}

export interface ICorsOptions {
	origin: string;
	methods: string | string[];
	preflightContinue: boolean;
	optionsSuccessStatus: number;
}

export interface ICache {
	enable: boolean;
	time: number;
	host: string;
	port: number;
}

export interface IAWS {
	accessKeyId: string;
	secretAccessKey: string;
	region: string;
	bucket: string;
}

export interface IHttps {
	enable: boolean;
	certFilePath: string;
	keyFilePath: string;
}

export interface ISecurity {
	saltRounds: number;
	authsecret: string;
}

export interface IEnvironment {
  nodeEnv: string;
  port: number;
  host: string;
  storage: string;
  timezone?: string;
  database: IDatabase;
  cache: ICache;
  https: IHttps;
  security: ISecurity;
}

export interface IDatabase {
  client: string;
  host: string;
  name: string;
  password: string;
  port: number;
  aws: IAWS;
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

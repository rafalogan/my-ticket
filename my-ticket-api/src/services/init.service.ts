import { IHttps } from 'src/repositories/types';
import { HttpsModel } from 'src/repositories/models';
import { ServerOptions } from 'https';

export class InitService {
	constructor() {}

	getOptions(options: IHttps) {
		return new HttpsModel(options) as ServerOptions;
	}
}

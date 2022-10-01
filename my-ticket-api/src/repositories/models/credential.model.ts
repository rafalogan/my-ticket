import { ICredentials } from 'src/repositories/types';

export class Credentials {
	email: string;
	password: string;

	constructor(data: ICredentials) {
		Object.assign(this, data);
	}
}

import { ICredentials } from 'src/repositories/types';

export class Credentials {
	email: string;
	password: string;

	constructor(data: ICredentials) {
		this.email = data.email;
		this.password = data.password;
	}
}

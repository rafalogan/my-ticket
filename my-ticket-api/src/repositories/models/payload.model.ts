import { Profile, User } from 'src/repositories/entities';
import { IPayload, IProfile } from 'src/repositories/types';

export class Payload {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	profile: IProfile | Profile;
	iat: number;
	exp: number;

	constructor(data: User | IPayload) {
		Object.assign(this, data);
		this.iat = !(data instanceof User) && data.iat ? data.iat : this.now();
		this.exp = !(data instanceof User) && data.exp ? data.exp : this.expires();
	}

	private now() {
		return Math.floor(Date.now() / 1000);
	}

	private expires() {
		return this.iat + 60 * 60 * 24;
	}
}

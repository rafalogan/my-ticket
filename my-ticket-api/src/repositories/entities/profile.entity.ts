import { IProfile } from '../types';

export class Profile {
	id: number | undefined;
	name: string;
	description: string;
	active: boolean;

	constructor(data: IProfile, id?: number) {
		Object.assign(this, data);

		this.id = id ? Number(id) : this.id;
		this.active = data.active || true;
	}
}

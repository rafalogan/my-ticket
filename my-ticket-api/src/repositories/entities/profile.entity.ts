import { IProfile } from '../types';

export class Profile {
	private _id: number;
	private _name: string;
	private _description: string;
	private _active: boolean;

	constructor(data: IProfile, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;
		this.active = data.active || true;
	}

	get id() {
		return this._id;
	}

	set id(value: number) {
		this._id = Number(value);
	}

	get name() {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get description() {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}
	get active() {
		return this._active;
	}

	set active(value: boolean) {
		this._active = value;
	}
}

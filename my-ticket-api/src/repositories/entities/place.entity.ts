import { IPlace } from 'src/repositories/types';

export class Place {
	private _id: number;
	private _name: string;
	private _adressId: number;
	private _userId: number;

	constructor(data: IPlace, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;
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

	get adressId() {
		return this._adressId;
	}

	set adressId(value: number) {
		this._adressId = Number(value);
	}

	get userId() {
		return this._userId;
	}

	set userId(value: number) {
		this._userId = Number(value);
	}
}

import { ITheater } from '../types';

export class Theater {
	private _id: number;
	private _placeId: number;
	private _name: string;
	private _description: string;

	constructor(data: ITheater, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;
	}

	get id() {
		return this._id;
	}

	set id(value: number) {
		this._id = Number(value);
	}

	get placeId() {
		return this._placeId;
	}

	set placeId(value: number) {
		this._placeId = Number(value);
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
}

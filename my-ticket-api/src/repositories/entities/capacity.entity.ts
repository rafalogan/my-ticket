import { ICapacity } from '../types';

export class Capacity {
	private _id: number;
	private _theaterId: number;
	private _section: string;
	private _row: string;
	private _places: number;

	constructor(data: ICapacity, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;
	}

	get id() {
		return this._id;
	}

	set id(value: number) {
		this._id = Number(value);
	}

	get theaterId() {
		return this._theaterId;
	}

	set theaterId(value: number) {
		this._theaterId = Number(value);
	}

	get section() {
		return this._section;
	}

	set section(value) {
		this._section = value;
	}

	get row() {
		return this._row;
	}

	set row(value) {
		this._row = value;
	}

	get places() {
		return this._places;
	}

	set places(value: number) {
		this._places = Number(value);
	}
}

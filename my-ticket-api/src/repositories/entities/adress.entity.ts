import { IAdress } from 'src/repositories/types';

export class Adress {
	private _id: number;
	private _cep: string;
	private _street: string;
	private _number: string;
	private _complement: string;
	private _district: string;
	private _city: string;
	private _state: string;
	private _urlMaps: string;

	constructor(data: IAdress, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;
	}

	get id() {
		return this._id;
	}

	set id(value) {
		this._id = Number(value);
	}

	get cep() {
		return this._cep;
	}

	set cep(value) {
		this._cep = value;
	}

	get street() {
		return this._street;
	}

	set street(value) {
		this._street = value;
	}

	get number() {
		return this._number;
	}

	set number(value) {
		this._number = value;
	}

	get complement() {
		return this._complement;
	}

	set complement(value) {
		this._complement = value;
	}

	get district() {
		return this._district;
	}

	set district(value) {
		this._district = value;
	}

	get city() {
		return this._city;
	}

	set city(value) {
		this._city = value;
	}

	get state() {
		return this._state;
	}

	set state(value) {
		this._state = value;
	}

	get urlMaps() {
		return this._urlMaps;
	}

	set urlMaps(value) {
		this._urlMaps = value;
	}
}

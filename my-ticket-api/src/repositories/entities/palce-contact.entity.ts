import { IPlaceContact } from 'src/repositories/types';

export class PlaceContact {
	private _id: number;
	private _placeId: number;
	private _value: string;
	private _type: string;

	constructor(data: IPlaceContact, id?: number) {
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

	get value() {
		return this._value;
	}

	set value(value: string) {
		this._value = value;
	}

	get type() {
		return this._type;
	}

	set type(value: string) {
		this._type = value;
	}
}

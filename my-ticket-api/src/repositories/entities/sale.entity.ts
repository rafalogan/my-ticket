import { ISale } from '../types';

export class Sale {
	private _id: number;
	private _ticketId: number;
	private _userId: number;
	private _palce: string;

	constructor(data: ISale, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;
	}

	get id() {
		return this._id;
	}
	set id(value: number) {
		this._id = Number(value);
	}

	get ticketId() {
		return this._ticketId;
	}
	set ticketId(value: number) {
		this._ticketId = Number(value);
	}

	get userId() {
		return this._userId;
	}
	set userId(value: number) {
		this._userId = Number(value);
	}

	get palce() {
		return this._palce;
	}
	set palce(value: string) {
		this._palce = value;
	}
}

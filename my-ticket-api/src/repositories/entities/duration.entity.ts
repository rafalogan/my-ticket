import { IDuration } from '../types';
import { convertToDate } from 'src/utils';

export class Duration {
	private _id: number;
	private _startDate: Date;
	private _endDate: Date;
	private _theaterId: number;

	constructor(data: IDuration, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;

		if (this.startDate < this.endDate) throw new Error();
	}

	get id() {
		return this._id;
	}

	set id(value: number) {
		this._id = Number(value);
	}

	get startDate() {
		return this._startDate;
	}

	set startDate(value: Date | string) {
		this._startDate = convertToDate(value);
	}

	get endDate() {
		return this._endDate;
	}

	set endDate(value: Date | string) {
		this._endDate = convertToDate(value);
	}

	get theaterId() {
		return this._theaterId;
	}

	set theaterId(value: number) {
		this._theaterId = Number(value);
	}
}

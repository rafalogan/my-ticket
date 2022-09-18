import { IEvent } from '../types';

export class EventEntity {
	private _id: number;
	private _categoryId: number;
	private _title: string;
	private _subTitle: string;
	private _content: string;
	private _type: string;
	private _userId: number;

	constructor(data: IEvent, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;
	}

	get id() {
		return this._id;
	}

	set id(value: number) {
		this._id = Number(value);
	}

	get categoryId() {
		return this._categoryId;
	}

	set categoryId(value: number) {
		this._categoryId = Number(value);
	}

	get title() {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get subTitle() {
		return this._subTitle;
	}

	set subTitle(value: string) {
		this._subTitle = value;
	}

	get content() {
		return this._content;
	}

	set content(value: string | Blob) {
		this._content = value.toString();
	}

	get type() {
		return this._type;
	}

	set type(value: string) {
		this._type = value;
	}

	get userId() {
		return this._userId;
	}

	set userId(value: number) {
		this._userId = Number(value);
	}
}

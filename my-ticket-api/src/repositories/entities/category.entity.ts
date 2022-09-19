import { ICategory } from '../types';

export class Category {
	private _id: number;
	private _name: string;
	private _description: string;
	private _url: string;
	private _parentId: number;

	constructor(data: ICategory, id?: number) {
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

	get description() {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	get url() {
		return this._url;
	}

	set url(value: string) {
		this._url = value;
	}

	get patentId() {
		return this._parentId;
	}

	set patentId(value: number) {
		this._parentId = Number(value);
	}
}

import { IFile } from '../types';

export class FileEntity {
	private _id: number;
	private _categoryId: number;
	private _eventId: number;
	private _title: string;
	private _name: string;
	private _fileName: string;
	private _filePath: string;
	private _fileType: string;
	private _url: string;

	constructor(data: IFile) {
		Object.assign(this, data);
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

	get eventId() {
		return this._eventId;
	}

	set eventId(value: number) {
		this._eventId = Number(value);
	}

	get title() {
		return this._title;
	}

	set title(value) {
		this._title = value;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		this._name = value;
	}

	get fileName() {
		return this._fileName;
	}

	set fileName(value: string) {
		this._fileName = value;
	}

	get filePath() {
		return this._filePath;
	}

	set filePath(value: string) {
		this._filePath = value;
	}

	get fileType() {
		return this._fileType;
	}

	set fileType(value: string) {
		this._fileType = value;
	}

	get url() {
		return this._url;
	}

	set url(value: string) {
		this._url = value;
	}
}

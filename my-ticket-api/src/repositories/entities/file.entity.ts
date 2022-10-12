import { IFile } from '../types';

export class FileEntity {
	id?: number;
	title?: string;
	alt?: string;
	name: string;
	type: string;
	url: string;
	eventId?: number;
	categoryId?: number;

	constructor(data: IFile, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.title = data.title;
		this.alt = data.alt ? data.alt.toString() : undefined;
		this.name = data.name;
		this.type = data.type;
		this.url = data.url;
		this.eventId = Number(data.eventId) || undefined;
		this.categoryId = Number(data.categoryId) || undefined;
	}
}

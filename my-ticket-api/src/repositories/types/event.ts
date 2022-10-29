import { EventEntity } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';
import { IFile } from 'src/repositories/types/file';
import { ReadOptions } from 'src/repositories/types/base';

export interface IEvent {
	id?: number;
	title: string;
	subtitle?: string;
	content: string | Blob;
	popularity?: number;
	releaseDate?: Date | string;
	voteAverage?: number;
	voteCount?: number;
	type: string;
	files?: EventFiles;
	categoryId?: number;
	userId?: number;
}

export interface EventFiles {
	poster?: IFileEvent;
	cover?: IFileEvent;
	videos?: IFileEvent[];
	gallery?: IFileEvent[];
}

export interface IFileEvent {
	title: string;
	alt?: string | Blob;
	name: string;
	type: string;
	url: string;
	location: string;
}

export interface Events {
	data: IEvent[] | EventEntity[];
	pagination: Pagination;
}

export interface EventRaw {
	id: number;
	title: string;
	subtitle: string;
	content: string | Blob;
	popularity: number;
	releasedate: Date | string;
	voteaverage: number;
	votecount: number;
	type: string;
	categoryid?: number;
	userid?: number;
	fileid: number;
	filetitle: string;
	filealt: string | Blob;
	filename: string;
	filetype: string;
	fileulr: string;
	filelocation: string;
}

export interface ReadEventsOptions extends ReadOptions {
	type?: string;
}

import { EventEntity } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';

export interface IEvent {
	id?: number;
	title: string;
	subtitle?: string;
	content: string | Blob;
	type: string;
	categoryId: number;
	userId?: number;
}

export interface Events {
	data: IEvent[] | EventEntity[];
	pagination: Pagination;
}

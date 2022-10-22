import { EventEntity } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';

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
	categoryId: number;
	userId?: number;
}

export interface Events {
	data: IEvent[] | EventEntity[];
	pagination: Pagination;
}

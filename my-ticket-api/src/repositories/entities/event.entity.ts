import { EventFiles, IEvent } from '../types';
import { convertToDate, setTimestampFields } from 'src/utils';

export class EventEntity {
	id?: number;
	title: string;
	subtitle?: string;
	content: string;
	popularity?: number;
	releaseDate?: Date;
	voteAverage?: number;
	voteCount?: number;
	type: string;
	files?: EventFiles;
	categoryId: number;
	userId?: number;

	constructor(data: IEvent, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.title = data.title;
		this.subtitle = data.subtitle;
		this.content = data.content.toString();
		this.popularity = Number(data.popularity) || undefined;
		this.releaseDate = setTimestampFields(data.releaseDate);
		this.voteAverage = Number(data.voteAverage) || undefined;
		this.voteCount = Number(data.voteCount) || undefined;
		this.type = data.type;
		this.files = data.files || undefined;
		this.categoryId = Number(data.categoryId);
		this.userId = Number(data.userId) || undefined;
	}
}

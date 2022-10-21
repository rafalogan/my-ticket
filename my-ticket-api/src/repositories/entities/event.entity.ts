import { IEvent } from '../types';

export class EventEntity {
	id?: number;
	title: string;
	subtitle?: string;
	content: string;
	type: string;
	categoryId: number;
	userId?: number;

	constructor(data: IEvent, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.title = data.title;
		this.subtitle = data.subtitle;
		this.content = data.content.toString();
		this.type = data.type;
		this.categoryId = Number(data.categoryId);
		this.userId = Number(data.userId) || undefined;
	}
}

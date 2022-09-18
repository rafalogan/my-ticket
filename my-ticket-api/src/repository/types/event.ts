export interface IEvent {
	id?: number;
	categoryId: number;
	title: string;
	subTitle?: string;
	content: string;
	type: string;
	userId: number;
}

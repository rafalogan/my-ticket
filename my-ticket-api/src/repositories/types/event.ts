export interface IEvent {
	id?: number;
	categoryId: number;
	title: string;
	subTitle?: string;
	content: string | Blob;
	type: string;
	userId: number;
}

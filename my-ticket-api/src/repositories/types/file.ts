import { IID } from './shared';

export interface IFile extends File, IID {
	title?: string;
	alt?: string;
	name: string;
	type: string;
	url: string;
	eventId?: number;
	categoryId?: number;
}

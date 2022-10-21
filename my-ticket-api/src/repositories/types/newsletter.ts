import { IID, ReadOptions } from 'src/repositories/types';

export interface INewsletter extends IID {
	name?: string;
	email: string;
	active: boolean;
}

export interface ReadNewsletterOptions extends ReadOptions {
	email?: string;
}

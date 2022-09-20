import { IID } from './shared';

export interface ITheater extends IID {
	placeId: number;
	name: string;
	description?: string;
}

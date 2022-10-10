import { IID } from './shared';

export interface ITheater extends IID {
	name: string;
	description?: string;
	placeId: number;
}

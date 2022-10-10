import { IID } from './shared';

export interface IDuration extends IID {
	start: Date | string;
	end: Date | string;
	theaterId: number;
}

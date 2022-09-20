import { IID } from './shared';

export interface IDuration extends IID {
	startDate: Date | string;
	endDate: Date | string;
	theaterId: number;
}

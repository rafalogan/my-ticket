import { IID } from './shared';

export interface IDuration extends IID {
	startDate: Date;
	endDate: Date;
	theaterId: number;
}

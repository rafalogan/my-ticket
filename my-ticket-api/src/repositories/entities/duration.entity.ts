import { IDuration } from '../types';
import { convertToDate } from 'src/utils';

export class Duration {
	id?: number;
	startDate: Date;
	endDate: Date;
	theaterId: number;

	constructor(data: IDuration, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.startDate = convertToDate(data.startDate);
		this.endDate = convertToDate(data.endDate);
		this.theaterId = Number(data.theaterId);
	}
}

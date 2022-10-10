import { IDuration } from '../types';
import { convertToDate } from 'src/utils';

export class Duration {
	id?: number;
	start: Date;
	end: Date;
	theaterId: number;

	constructor(data: IDuration, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.start = convertToDate(data.start);
		this.end = convertToDate(data.end);
		this.theaterId = Number(data.theaterId);
	}
}

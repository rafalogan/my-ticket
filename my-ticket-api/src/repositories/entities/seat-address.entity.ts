import { ISeatAddress } from 'src/repositories/types';

export class SeatAddress {
	id?: number;
	section?: string;
	row?: string;
	seat: number;
	theaterId: number;

	constructor(data: ISeatAddress, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.section = data.section;
		this.row = data.row;
		this.seat = Number(data.seat);
		this.theaterId = Number(data.theaterId);
	}
}

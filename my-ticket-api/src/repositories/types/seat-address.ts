import { IID } from 'src/repositories/types/shared';

export interface ISeatAddress extends IID {
	section?: string;
	row?: string;
	seat: number;
	total?: number;
	theaterId: number;
}

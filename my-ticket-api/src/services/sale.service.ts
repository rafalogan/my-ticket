import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions } from 'src/repositories/types';
import { Sale } from 'src/repositories/entities';

export class SaleService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	create(item: Sale) {
		return super.create(item);
	}
}

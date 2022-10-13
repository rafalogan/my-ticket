import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ISale, List, ReadOptions } from 'src/repositories/types';
import { Sale } from 'src/repositories/entities';
import { DatabaseException, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';

export class SaleService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	create(item: Sale) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: Sale) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAll(options?: ReadOptions) {
		return super
			.findAll(options)
			.then(res => (!res || res instanceof DatabaseException ? res : this.setSales(res)))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (!res || res instanceof DatabaseException ? res : new Sale(res)))
			.catch(err => err);
	}

	private setSales(value: List<ISale>) {
		const data = value.data.map(s => new Sale(s));
		return { ...value, data };
	}
}

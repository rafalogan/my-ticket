import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ISeatAddress, ReadOptions } from 'src/repositories/types';
import { DatabaseException, existsOrError, messages, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';
import { SeatAddress } from 'src/repositories/entities';

export class SeatAddressService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	validate(data: ISeatAddress) {
		existsOrError(data.seat, messages.requires('Acentos'));
		existsOrError(data.theaterId, messages.requires('Sala'));
	}

	create(item: SeatAddress) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: SeatAddress) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAllByWhere(column: string, value: any, fields: string[] = this.fields) {
		return super
			.findAllByWhere(column, value, fields)
			.then(res => (!res || res instanceof DatabaseException ? res : res.map((i: ISeatAddress) => new SeatAddress(i))))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (!res || res instanceof DatabaseException ? res : new SeatAddress(res)))
			.catch(err => err);
	}
}

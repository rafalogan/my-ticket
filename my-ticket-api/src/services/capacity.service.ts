import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ICapacity, ReadOptions } from 'src/repositories/types';
import {
	DatabaseException,
	existsOrError,
	messages,
	notExistisOrError,
	responseDataBaseCreate,
	responseDataBaseUpdate,
	responseNotFoundRegister,
} from 'src/utils';
import { Capacity } from 'src/repositories/entities';

export class CapacityService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	async validate(data: ICapacity) {
		existsOrError(data.places, messages.requires('Número de Lugares'));
		existsOrError(data.theaterId, messages.requires('Sala'));
	}

	create(item: Capacity) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: Capacity) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAllByWhere(column: string, value: number, fields: string[] = this.fields) {
		return super.findAllByWhere(column, value, fields).then(res => {
			if (!res) return responseNotFoundRegister('theaterId', value);
			if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);

			return res.map((c: ICapacity) => new Capacity(c));
		});
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => {
				if (!res) return responseNotFoundRegister('id', id);
				if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);

				return new Capacity(res);
			})
			.catch(err => err);
	}
}

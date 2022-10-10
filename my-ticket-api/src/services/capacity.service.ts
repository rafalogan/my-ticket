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
		const fromDB = await this.findOneByWhere('theaterId', data.theaterId);
		existsOrError(data.places, messages.requires('Número de Lugares'));
		existsOrError(data.theaterId, messages.requires('Sala'));
		notExistisOrError(fromDB, `Capacidade ${messages.alreadyExists}`);
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

	findOneByWhere(column: string, value: number, options?: ReadOptions) {
		return super
			.findOneByWhere(column, value, options)
			.then(res => {
				if (!res) return responseNotFoundRegister(column, value);
				if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);

				return new Capacity(res);
			})
			.catch(err => err);
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

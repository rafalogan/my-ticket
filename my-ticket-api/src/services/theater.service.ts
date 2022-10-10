import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ITheater, List, ReadOptions } from 'src/repositories/types';
import {
	DatabaseException,
	existsOrError,
	messages,
	responseDataBaseCreate,
	responseDataBaseUpdate,
	responseNotFoundRegister,
} from 'src/utils';
import { Theater } from 'src/repositories/entities';

export class TheaterService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	validate(data: ITheater) {
		existsOrError(data.name, messages.requires('Nome'));
		existsOrError(data.placeId, messages.requires('Local'));
	}

	create(item: Theater) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, value: Theater) {
		return super
			.update(id, value)
			.then(res => responseDataBaseUpdate(res, value))
			.catch(err => err);
	}

	theatersByPlace(placeId: number) {
		return super
			.findAllByWhere('place_id', placeId)
			.then(res => {
				if (!res) return responseNotFoundRegister('placeId', placeId);
				if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);
				return res.map((t: ITheater) => new Theater(t));
			})
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (res instanceof DatabaseException ? res : new Theater(res)))
			.catch(err => err);
	}
}

import { BaseService } from 'src/core/abstracts';
import { Duration } from 'src/repositories/entities';
import { BaseServiceOptions, IDuration, ReadOptions } from 'src/repositories/types';
import {
	DatabaseException,
	existsOrError,
	messages,
	responseDataBaseCreate,
	responseDataBaseUpdate,
	responseNotFoundRegister,
} from 'src/utils';

export class DurationService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	validate(data: IDuration) {
		existsOrError(data.start, messages.requires('Data e hora de início'));
		existsOrError(data.end, messages.requires('Data e hora de término'));
		existsOrError(data.theaterId, messages.requires('Espaço'));
	}

	create(item: DurationService) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: any) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAllByWhere(column: string, value: any, fields: string[] = this.fields) {
		return super.findAllByWhere(column, value, fields).then(res => {
			if (!res) return responseNotFoundRegister(column, value);
			if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);

			return res.map((d: IDuration) => new Duration(d));
		});
	}

	findOneById(id: number, options?: ReadOptions) {
		return super.findOneById(id, options).then(res => {
			if (!res) return responseNotFoundRegister('id', id);
			if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);

			return new Duration(res);
		});
	}
}

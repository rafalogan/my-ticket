import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IPlace, List, PlaceReadOptions, ReadOptions } from 'src/repositories/types';
import { Place } from 'src/repositories/entities';
import { DatabaseException, existsOrError, messages, notExistisOrError, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';
import { Pagination, PlaceModel } from 'src/repositories/models';

export class PlaceService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	async validate(data: IPlace) {
		existsOrError(data.name, messages.requires('Nome do local'));
	}

	create(item: Place) {
		return super
			.create(item)
			.then(result => responseDataBaseCreate(result, item))
			.catch(err => err);
	}

	update(id: number, data: Place) {
		return super.update(id, data).then(res => responseDataBaseUpdate(res, data));
	}

	async findAll(options?: ReadOptions) {
		return super
			.findAll(options)
			.then(res => (res instanceof DatabaseException ? res : this.setPlaces(res)))
			.catch(err => err);
	}

	async findAllByUser(id: number, options: ReadOptions) {
		const page = options?.page || 1;
		const limit = options?.limit || 10;
		const count = await this.countById();
		const pagination = new Pagination({ page, count, limit });

		return this.conn(this.table)
			.select(...(options.fields || this.fields))
			.where('user_id', [id])
			.limit(limit)
			.offset(page * limit - limit)
			.orderBy(options?.order?.by || 'id', options?.order?.type || 'asc')
			.then(res => {
				if (!res) return [];
				if (!Array.isArray(res)) return new DatabaseException(messages.notFoundRegister, res);

				return this.setPlaces({ data: res, pagination });
			})
			.catch(err => err);
	}

	findOneById(id: number, options?: PlaceReadOptions) {
		return this.conn(this.table)
			.select(...(options?.fields || this.fields))
			.where({ id })
			.andWhere('user_id', [options?.userId])
			.then(res => this.responseFindPlace(res))
			.catch(err => err);
	}

	private responseFindPlace(res: any) {
		if (!res) return {};
		if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);
		if (res instanceof DatabaseException) return res;
		return new PlaceModel(res);
	}

	private setPlaces(value: List<IPlace>): List<PlaceModel> {
		const data = value.data.map((place: IPlace) => new PlaceModel(place));
		return { ...value, data };
	}
}

import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IPlace, List, ReadOptions } from 'src/repositories/types';
import { Place } from 'src/repositories/entities';
import { DatabaseException, existsOrError, messages, notExistisOrError, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';

export class PlaceService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	async validate(data: IPlace) {
		const fromDB = (await this.findOneByWhere('name', data.name)) as Place;

		existsOrError(data.name, messages.requires('Nome do local'));
		notExistisOrError(fromDB, fromDB.name + ' ' + messages.alreadyExists);
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

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (res instanceof DatabaseException ? res : new Place(res)))
			.catch(err => err);
	}

	private setPlaces(value: List<IPlace>): List<Place> {
		value.data = value.data.map((place: IPlace) => new Place(place));
		return value;
	}
}

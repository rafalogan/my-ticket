import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, Events, IEvent, ReadOptions } from 'src/repositories/types';
import { DatabaseException, existsOrError, messages, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';
import { EventEntity } from 'src/repositories/entities';

export class EventService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	async validate(value: IEvent) {
		existsOrError(value.title, messages.requires('Titulo'));
		existsOrError(value.content, messages.requires('Conteudo'));
		existsOrError(value.type, messages.requires('tipo'));
		existsOrError(value.categoryId, messages.requires('Categoria'));
	}

	create(item: EventEntity) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	async update(id: number, values: any) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (res instanceof DatabaseException ? res : new EventEntity(res)))
			.catch(err => err);
	}

	findAll(options: ReadOptions) {
		return super.findAll(options).then(res => (res instanceof DatabaseException ? res : this.setEvents(res)));
	}

	private setEvents(value: Events) {
		value.data = value.data.map(e => new EventEntity(e));
		return value;
	}
}

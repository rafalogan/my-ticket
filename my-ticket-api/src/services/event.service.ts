import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, Events, IEvent, ReadOptions } from 'src/repositories/types';
import { DatabaseException, existsOrError, messages, notExistisOrError, responseDataBaseCreate } from 'src/utils';
import { EventEntity } from 'src/repositories/entities';
import { onLog } from 'src/core/handlers';

export class EventService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	async validate(value: IEvent) {
		const fromDB = (await this.findOneByWhere('title', value.title)) as IEvent;

		onLog('events', fromDB);

		existsOrError(value.title, messages.requires('Titulo'));
		existsOrError(value.content, messages.requires('Conteudo'));
		existsOrError(value.type, messages.requires('tipo'));
		existsOrError(value.categoryId, messages.requires('Categoria'));
		notExistisOrError(fromDB, 'Esse evento ' + messages.alreadyExists);
	}

	save(data: EventEntity) {
		return data.id
			? this.update(data.id, data)
					.then(res => (res instanceof DatabaseException ? res : { ...res, data }))
					.catch(err => err)
			: this.create(data)
					.then(res => responseDataBaseCreate(res, data))
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

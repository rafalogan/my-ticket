import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, EventRaw, Events, IEvent, ReadEventsOptions, ReadOptions } from 'src/repositories/types';
import {
	DatabaseException,
	deleteField,
	eventFieldsJoin,
	eventQuery,
	eventsQuery,
	existsOrError,
	filterEventComplete,
	filterEventToList,
	messages,
	responseDataBaseCreate,
	responseDataBaseUpdate,
} from 'src/utils';
import { EventEntity } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';
import { onLog } from 'src/core/handlers';

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
		return this.conn
			.raw(eventQuery(eventFieldsJoin, id))
			.then(res => {
				if (!res) return {};
				if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);
				return new EventEntity(filterEventComplete(res.rows));
			})
			.catch(err => err);
	}

	async findAll(options: ReadEventsOptions) {
		const page = options?.page || 1;
		const limit = options?.limit || 10;
		const count = await this.countById();
		const pagination = new Pagination({ page, count, limit });

		onLog('query', eventsQuery(eventFieldsJoin, { ...options, limit, page }));
		onLog('options', options);

		if (options.userId) {
			return super
				.findAllByUser(options.userId, { ...options, paginate: true })
				.then(res => (!res || res instanceof DatabaseException ? res : this.setEvents(res)))
				.catch(err => err);
		}

		return this.conn
			.raw(eventsQuery(eventFieldsJoin, { ...options, limit, page }))
			.then(res => {
				if (!res) return [];
				if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);

				return this.setEvents({ data: res.rows.map(filterEventToList), pagination }, true);
			})
			.catch(err => err);
	}

	private setEvents(value: Events, noUser = false) {
		value.data = noUser ? value.data.map(e => new EventEntity(e)).map(this.deleteUser) : value.data.map(e => new EventEntity(e));
		return value;
	}

	private deleteUser(item: EventEntity) {
		deleteField(item, 'userId');
		return item;
	}
}

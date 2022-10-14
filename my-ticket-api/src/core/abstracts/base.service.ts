import { Knex } from 'knex';

import { CacheBaseService } from 'src/core/abstracts/cache-base.service';
import { BaseServiceOptions, ReadOptions } from 'src/repositories/types';
import { convertDataValues, deleteField, existsOrError, messages, DatabaseException, camelToSnake } from 'src/utils';
import { Pagination } from 'src/repositories/models';

export abstract class BaseService extends CacheBaseService {
	protected conn: Knex;
	protected table: string;
	protected fields: string[];

	protected constructor(data: BaseServiceOptions) {
		super(data);
		Object.assign(this, data);

		this.fields = data?.fields || [];
	}

	save(data: any) {
		return data.id ? this.update(data.id, data) : this.create(data);
	}

	create(item: any) {
		deleteField(item, 'id');
		const data = convertDataValues(item);
		return this.conn(this.table)
			.insert(data)
			.then(result => result)
			.catch(err => err);
	}

	read(options?: ReadOptions) {
		if (this.activeCache) return this.checkCache(options);
		return options?.id ? this.findOneById(Number(options.id), options) : this.findAll(options);
	}

	async update(id: number, values: any) {
		const data = convertDataValues(values);

		if (this.activeCache) await this.clearCache(id);

		return this.conn(this.table)
			.update(data)
			.where({ id })
			.then(result => result)
			.catch(err => err);
	}

	async delete(id: number): Promise<any> {
		const element = await this.findOneById(id);

		try {
			existsOrError(element, `The register nº ${id} not find in table: ${this.table}`);
		} catch (error: any) {
			throw new DatabaseException(error.message, element);
		}

		if (this.activeCache) await this.clearCache(id);

		return this.conn(this.table)
			.where({ id })
			.del()
			.then(result =>
				result > 0 ? { id, deleted: result > 0, message: messages.successDel, element } : new DatabaseException(messages.noDel, result)
			)
			.catch(err => err);
	}

	protected async findOneByWhere(column: string, value: any, options?: ReadOptions): Promise<any> {
		if (this.activeCache) {
			return this.findCache(
				['GET:content', this.findOneByWhere.name, column, value],
				() => this.findOneByWhere(column, value),
				options?.cacheTime || this.defaultTime
			);
		}

		return this.conn(this.table)
			.select(...this.fields)
			.where(column, value)
			.first()
			.then(result => {
				if (!result) return result;
				if (result.severity === 'ERROR') return new DatabaseException(result.detail || result.hint || messages.notFoundRegister, result);
				return result;
			})
			.catch(err => err);
	}

	protected async countById() {
		return this.conn(this.table)
			.count({ count: 'id' })
			.first()
			.then(result => Number(result?.count))
			.catch(err => err);
	}

	protected async clearCache(id?: number) {
		if (id) await this.deleteCache([`GET:content`, this.read.name, `${id}`]);
		return this.deleteCache(['GET:allContent', this.read.name]);
	}

	protected findAllByWhere(column: string, value: any, fields = this.fields): Promise<any> {
		column = camelToSnake(column);

		if (this.activeCache) {
			return this.findCache(
				['GET:allContent', this.findAllByWhere.name, column, value],
				() => this.findAllByWhere(column, value, fields),
				this.defaultTime
			);
		}

		return this.conn(this.table)
			.select(...fields)
			.where(column, value)
			.then(result => result)
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions): Promise<DatabaseException | any> {
		return this.conn(this.table)
			.select(...(options?.fields ?? this.fields))
			.where({ id })
			.first()
			.then(item => {
				if (!item) return item;
				if (item.severity === 'ERROR') return new DatabaseException(messages.noRead, item);
				return item;
			})
			.catch(err => err);
	}

	async findAll(options?: ReadOptions): Promise<any> {
		const page = options?.page || 1;
		const limit = options?.limit || 10;
		const count = await this.countById();
		const pagination = new Pagination({ page, count, limit });

		return this.conn(this.table)
			.select(...(options?.fields ?? this.fields))
			.limit(limit)
			.offset(page * limit - limit)
			.orderBy(options?.order?.by || 'id', options?.order?.type || 'asc')
			.then(data => {
				if (!data) return data;
				if (!Array.isArray(data)) return new DatabaseException(messages.notFoundRegister, data);

				return { data, pagination };
			})
			.catch(err => err);
	}

	protected checkCache(options?: ReadOptions) {
		const id = Number(options?.id);

		return id
			? this.findCache(
					[`GET:content`, this.read.name, `${id}`],
					() => this.findOneById(id, options),
					options?.cacheTime || this.defaultTime
			  )
			: this.findCache(['GET:allContent', this.read.name], () => this.findAll(options), options?.cacheTime || this.defaultTime);
	}
}

import { Knex } from 'knex';

import { CacheBaseService } from 'src/core/abstracts/cache-base.service';
import { BaseServiceOptions, ReadOptions } from 'src/repositories/types';
import { onError, onLog } from 'src/core/handlers';
import { convertDataValues, DatabaseException, deleteField, existsOrError } from 'src/utils';
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

	async update(id: number, values: any): Promise<any> {
		const data = convertDataValues(values);

		if (this.activeCache) await this.clearCache(id);

		return this.conn(this.table)
			.update(data)
			.where({ id })
			.then(result => result)
			.catch(err => err);
	}

	async delete(id: any): Promise<any> {
		const element = await this.findOneById(id);

		try {
			existsOrError(element, `The register nº ${id} not find in table: ${this.table}`);
		} catch (error: any) {
			throw new DatabaseException(error.message);
		}

		if (this.activeCache) await this.clearCache(id);

		return this.conn(this.table)
			.where({ id })
			.del()
			.then(async result => ({ deleted: result > 0, element }))
			.catch(err => err);
	}

	protected async countById() {
		return this.conn(this.table)
			.count({ count: 'id' })
			.first()
			.then(result => Number(result?.count))
			.catch(err => {
				onError(`Count by id in table: ${this.table}`, err);
				return 0;
			});
	}

	protected async clearCache(id?: number) {
		if (id) await this.deleteCache([`GET:content`, this.read.name, `${id}`]);
		return this.deleteCache(['GET:allContent', this.read.name]);
	}

	protected findOneById(id: number, options?: ReadOptions) {
		return this.conn(this.table)
			.select(...(options?.fields ?? this.fields))
			.where({ id })
			.first()
			.then(item => item)
			.catch(err => onError(`Find register failed in ${this.table}`, err));
	}

	protected async findAll(options?: ReadOptions): Promise<any> {
		const page = options?.page || 1;
		const limit = options?.limit || 10;
		const count = await this.countById();
		const pagination = new Pagination({ page, count, limit });

		return this.conn(this.table)
			.select(...(options?.fields ?? this.fields))
			.limit(limit)
			.offset(page * limit - limit)
			.orderBy(options?.order?.by || 'id', options?.order?.type || 'asc')
			.then((data: any[]) => ({ data, pagination }))
			.catch(err => onError(`Find register fail in table: ${this.table}`, err));
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

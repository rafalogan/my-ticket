import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, CategoryModel, ICategory, ReadOptions } from 'src/repositories/types';
import { Category } from 'src/repositories/entities';
import { categoryWithChildren, DatabaseException, existsOrError, messages, notExistisOrError, responseDataBaseCriate } from 'src/utils';

export class CategoryService extends BaseService {
	constructor(data: BaseServiceOptions) {
		super(data);
	}

	async validate(data: ICategory) {
		const fromDB = (await this.findOneByWhere('name', data.name)) as Category;

		existsOrError(data.name, messages.requires('Nome'));
		notExistisOrError(fromDB, 'Categoria ' + messages.alreadyExists);
	}

	save(data: Category) {
		if (data.id) {
			return this.update(data.id, data)
				.then(res => (res instanceof DatabaseException ? res : { ...res, data }))
				.catch(err => err);
		}

		return this.create(data)
			.then(res => responseDataBaseCriate(res, data))
			.catch(err => err);
	}

	findOneById(id: number) {
		return this.conn
			.raw(categoryWithChildren, [id])
			.then(result => result[0] as CategoryModel)
			.catch(err => err);
	}

	getSubCategories(parentId: number) {
		return this.conn(this.table)
			.select(...this.fields)
			.where({ parent_id: parentId })
			.then(res => (!Array.isArray(res) ? new DatabaseException(messages.noRead, res) : res.map(category => new Category(category))))
			.catch(err => err);
	}

	getCategoryRaw(id: number) {
		return this.conn(this.table)
			.select(...this.fields)
			.where({ id })
			.first()
			.then(res => (res.severity === 'ERROR' ? new DatabaseException(messages.noRead, res) : new Category(res)))
			.catch(err => err);
	}

	async delete(id: number): Promise<any> {
		const elemnet = await this.getCategoryRaw(id);

		existsOrError(elemnet, messages.notFoundRegister);

		const subCategories = (await this.getSubCategories(id)) as Category[];
		const prepareData = subCategories
			.map(c => {
				c.patentId = elemnet.patentId || undefined;
				return c;
			})
			.map(item => this.save(item));

		return Promise.all(prepareData)
			.then(() => super.delete(id))
			.catch(err => err);
	}
}

import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ICategory, ICategoryModel, ReadOptions } from 'src/repositories/types';
import { Category } from 'src/repositories/entities';
import { categoryWithChildrens, DatabaseException, existsOrError, messages, notExistisOrError, responseDataBaseCriate } from 'src/utils';
import { CategoryModel } from 'src/repositories/models';
import { onLog } from 'src/core/handlers';

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

	findOneById(id: number, options?: ReadOptions) {
		onLog('category id', id);
		const query = categoryWithChildrens(options?.fields || this.fields);

		return this.conn
			.raw(query, [id])
			.then(res =>
				res.severity === 'ERROR'
					? new DatabaseException(messages.noRead, res)
					: this.setCategoriesAndSubcategories(res.rows)?.find(i => i.id === id)
			)
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
		const elemnet = (await this.getCategoryRaw(id)) as Category;

		existsOrError(elemnet, messages.notFoundRegister);

		const subCategories = (await this.getSubCategories(id)) as Category[];
		const prepareData = subCategories
			.map(c => {
				c.parentId = elemnet.parentId || undefined;
				return c;
			})
			.map(item => this.save(item));

		return Promise.all(prepareData)
			.then(() => super.delete(id))
			.catch(err => err);
	}

	private setCategoriesAndSubcategories(value: ICategoryModel[], id?: number) {
		if (!value || !value.length) return undefined;
		value = value.map(this.parseValues);
		const roots = id ? value.filter(item => item.parentId === id) : value.filter(root => !root.parentId);

		return roots
			.map(root => {
				root.subCategories = this.setCategoriesAndSubcategories(value, root.id);
				return root;
			})
			.map(i => new CategoryModel(i));
	}

	private parseValues(value: any): ICategoryModel {
		return {
			id: Number(value.id),
			name: value.name,
			description: value.description,
			parentId: Number(value.parentId || value.parentid),
			userId: Number(value.userId || value.userid),
		};
	}
}

import { exists } from 'fs';
import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ICategory, ICategoryModel, ReadOptions } from 'src/repositories/types';
import {
	categoryWithChildrens,
	DatabaseException,
	existsOrError,
	filterCategoryModelInterface,
	messages,
	notExistisOrError,
	responseDataBaseCreate,
	responseDataBaseUpdate,
	ResponseException,
} from 'src/utils';
import { Category } from 'src/repositories/entities';
import { CategoryModel, Pagination } from 'src/repositories/models';

export class CategoryService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	async validate(data: ICategory) {
		const fromDB = await this.findOneByWhere('name', data.name);

		existsOrError(data.name, messages.requires('Nome da categoria'));
		notExistisOrError(fromDB, `A Categoria ${data.name} ${messages.alreadyExists}`);
	}

	create(item: Category) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: Category) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	async findAll(options?: ReadOptions) {
		return this.conn(this.table)
			.select(...(options?.fields || this.fields))
			.orderBy(options?.order?.by || 'id', options?.order?.type || 'asc')
			.then(res => {
				if (!res) return [];
				if (!Array.isArray(res)) return new DatabaseException(messages.notFoundRegister, res);
				return this.setCategoriesAndSubcategories(res);
			})
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		const query = categoryWithChildrens(options?.fields || this.fields);

		return this.conn
			.raw(query, [id])
			.then(res => {
				if (!res) return {};
				if (res.severity === 'ERROR') return new DatabaseException(messages.noRead, res);
				return this.setCategoriesAndSubcategories(res.rows).find(i => i.id === id) || {};
			})
			.catch(err => err);
	}

	async delete(id: number) {
		const element = (await this.findOneById(id)) as CategoryModel;

		try {
			existsOrError(element, messages.notFoundRegister);
		} catch (err) {
			return err;
		}

		if (element.subCategories.length) return new ResponseException(messages.categoryWithChildrenNoDelete(element.name), element);
		return super.delete(id);
	}

	private setCategoriesAndSubcategories(value: ICategoryModel[], id?: number) {
		value = value.map(filterCategoryModelInterface);
		const roots = this.setRoot(value, id) as ICategoryModel[];

		return roots
			.map(root => {
				root.subCategories = this.setCategoriesAndSubcategories(value, root.id);
				return root;
			})
			.map(i => new CategoryModel(i));
	}

	private setRoot(value: any[], id?: number) {
		const noParent = value.filter(i => !i.parentId);
		const patentId = id ? value.filter(i => i.parentId === id) : [];

		if (id) return patentId;
		if (noParent.length) return noParent;

		return value;
	}
}

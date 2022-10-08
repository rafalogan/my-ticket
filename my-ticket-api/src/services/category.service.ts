import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, ICategory, ICategoryModel, ReadOptions } from 'src/repositories/types';
import { Category } from 'src/repositories/entities';
import {
	categoryWithChildrens,
	DatabaseException,
	existsOrError,
	messages,
	notExistisOrError,
	responseDataBaseCriate,
	ResponseException,
} from 'src/utils';
import { CategoryModel } from 'src/repositories/models';
import { onLog } from 'src/core/handlers';
import httpStatus from 'http-status';

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

	async findAll(options?: ReadOptions) {
		return this.conn(this.table)
			.select(...(options?.fields || this.fields))
			.orderBy(options?.order?.by || 'id', options?.order?.type || 'asc')
			.then(res => (!Array.isArray(res) ? new DatabaseException(messages.noRead, res) : this.setCategoriesAndSubcategories(res)))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		const query = categoryWithChildrens(options?.fields || this.fields);

		return this.conn
			.raw(query, [id])
			.then(res =>
				res.severity === 'ERROR'
					? new DatabaseException(messages.noRead, res)
					: this.setCategoriesAndSubcategories(res.rows).find(i => i.id === id) || {}
			)
			.catch(err => err);
	}

	async delete(id: number) {
		const element = (await this.findOneById(id)) as CategoryModel;

		onLog('resiste to del:', element);

		try {
			existsOrError(element, messages.notFoundRegister);
		} catch (err) {
			return err;
		}

		if (element.subCategories.length) return new ResponseException(messages.categoryWithChildrenNoDelete(element.name), element);

		return super.delete(id);
	}

	private setCategoriesAndSubcategories(value: ICategoryModel[], id?: number) {
		value = value.map(this.parseValues);
		const roots = this.setRoot(value, id);

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
			url: value.url,
			parentId: Number(value.parentId || value.parentid),
			userId: Number(value.userId || value.userid),
		};
	}

	private setRoot(value: any[], id?: number) {
		const noParent = value.filter(i => !i.parentId);
		const patentId = id ? value.filter(i => i.parentId === id) : [];

		if (id) return patentId;
		if (noParent.length) return noParent;

		return value;
	}
}

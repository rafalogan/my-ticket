import { ICategoryModel } from '../types';

export class CategoryModel {
	id: number;
	name: string;
	description: string;
	url: string;
	parentId: number;
	subCategories: ICategoryModel[] | CategoryModel[];

	constructor(data: ICategoryModel) {
		Object.assign(this, data);
	}

	private setSubCategories(subCategories: ICategoryModel[]) {
		return subCategories.map(category => new CategoryModel(category)) || [];
	}
}

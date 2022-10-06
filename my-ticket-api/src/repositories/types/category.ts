import { CategoryModel } from 'src/repositories/models';

export interface ICategory {
	id?: number;
	name: string;
	description?: string;
	url?: string;
	parentId?: number;
}

export interface ICategoryModel extends ICategory {
	subCategories: ICategoryModel[] | CategoryModel[];
}

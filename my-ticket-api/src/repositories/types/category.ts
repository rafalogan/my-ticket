import { CategoryModel } from 'src/repositories/models';
import { IFile } from 'src/repositories/types/file';

export interface ICategory {
	id?: number;
	name: string;
	description?: string;
	url?: string;
	active?: boolean;
	parentId?: number;
	userId?: number;
}

export interface ICategoryModel extends ICategory {
	cover?: IFile;
	subCategories?: ICategoryModel[] | CategoryModel[];
}

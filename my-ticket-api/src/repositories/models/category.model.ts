import { ICategoryModel, IFile } from '../types';

export class CategoryModel {
	id: number;
	name: string;
	description: string;
	url?: string;
	active?: boolean;
	parentId?: number;
	cover: IFile;
	subCategories: ICategoryModel[] | CategoryModel[];

	constructor(data: ICategoryModel) {
		Object.assign(this, data);
	}
}

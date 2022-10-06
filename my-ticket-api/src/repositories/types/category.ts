export interface ICategory {
	id?: number;
	name: string;
	description?: string;
	url?: string;
	parentId?: number;
}

export interface CategoryModel extends ICategory {
	subCategories: CategoryModel[];
}

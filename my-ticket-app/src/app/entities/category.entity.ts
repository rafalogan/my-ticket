import { ICategory } from '../types';

export class Category {
  id: number;
  name: string;
  description: string;
  url?: string;
  active: boolean;
  subCategories: Category[];

  constructor(data: ICategory) {
    Object.assign(this, data);

    this.id = Number(this.id);
    this.subCategories = this.setSubCategories(data.subCategories);
  }

  private setSubCategories(subCategories: ICategory[]) {
    return subCategories.map(c => new Category(c));
  }
}

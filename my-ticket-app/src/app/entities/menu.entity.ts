import { ICategory } from 'app/types';

export class Menu {
  name: string;
  route: string;
  submenu: Menu[];
  category: ICategory;

  constructor(data: ICategory) {
    this.name = data.name;
    this.route = `/events?type=${data.name}&code=${data.id}`;
    this.submenu = this.setSubmenu(data.subCategories);
    this.category = data;
  }

  private setSubmenu(data: ICategory[]) {
    return data.map(i => new Menu(i));
  }
}

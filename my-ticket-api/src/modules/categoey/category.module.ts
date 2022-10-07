import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { CategoryService } from 'src/services';
import { CategoryController } from 'src/modules/categoey/category.controller';
import { CategoryRoute } from 'src/modules/categoey/category.route';

export class CategoryModule extends CommonModule {
	private readonly categoryController: CategoryController;
	private categoryRoute: CategoryRoute;

	constructor(options: ModuleOptions<CategoryService>) {
		super();

		this.categoryController = new CategoryController(options.service);
		this.categoryRoute = new CategoryRoute(options, this.categoryController);
	}

	exec = () => this.categoryRoute.exec();
}

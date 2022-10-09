import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { CategoryController } from 'src/modules/categoey/category.controller';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class CategoryRoute extends Routes {
	constructor(options: RouteOptions, private categoryController: CategoryController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/categories')
			.get(this.categoryController.list.bind(this.categoryController))
			.all(this.auth?.exec().authenticate())
			.post(this.categoryController.save.bind(this.categoryController))
			.all(methodNotAllowed);

		this.app
			.route('/categories/:id')
			.get(this.categoryController.list.bind(this.categoryController))
			.all(this.auth?.exec().authenticate())
			.put(this.categoryController.edit.bind(this.categoryController))
			.delete(this.categoryController.remove.bind(this.categoryController))
			.all(methodNotAllowed);
	}
}

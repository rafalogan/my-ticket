import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { SaleController } from 'src/modules/sale/sale.controller';

export class SaleRoute extends Routes {
	constructor(options: RouteOptions, private saleController: SaleController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/sales')
			.all(this.auth?.exec().authenticate())
			.post(this.saleController.save.bind(this.saleController))
			.get(this.saleController.list.bind(this.saleController))
			.all(methodNotAllowed);

		this.app
			.route('/sales/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.saleController.list.bind(this.saleController))
			.put(this.saleController.edit.bind(this.saleController))
			.delete(this.saleController.remove.bind(this.saleController))
			.all(methodNotAllowed);
	}
}

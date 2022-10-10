import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { CapacityController } from 'src/modules/capacity/capacity.controller';

export class CapacityRoute extends Routes {
	constructor(options: RouteOptions, private capacityController: CapacityController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/capacity')
			.all(this.auth?.exec().authenticate())
			.post(this.capacityController.save.bind(this.capacityController))
			.all(methodNotAllowed);

		this.app.route('/capacity/theater/:id').get(this.capacityController.list.bind(this.capacityController)).all(methodNotAllowed);

		this.app
			.route('/capacity/:id')
			.all(this.auth?.exec().authenticate())
			.put(this.capacityController.edit.bind(this.capacityController))
			.delete(this.capacityController.remove.bind(this.capacityController))
			.all(methodNotAllowed);
	}
}

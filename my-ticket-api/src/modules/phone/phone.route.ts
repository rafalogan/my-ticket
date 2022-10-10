import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { PhoneController } from 'src/modules/phone/phone.controller';

export class PhoneRoute extends Routes {
	constructor(options: RouteOptions, private phoneController: PhoneController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/phones')
			.all(this.auth?.exec().authenticate())
			.post(this.phoneController.save.bind(this.phoneController))
			.all(methodNotAllowed);

		this.app
			.route('/phones/user/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.phoneController.listByPlaceOrUser.bind(this.phoneController))
			.all(methodNotAllowed);

		this.app
			.route('/phones/place/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.phoneController.listByPlaceOrUser.bind(this.phoneController))
			.all(methodNotAllowed);

		this.app
			.route('/phones/:id')
			.all(this.auth?.exec().authenticate())
			.put(this.phoneController.edit.bind(this.phoneController))
			.delete(this.phoneController.remove.bind(this.phoneController))
			.all(methodNotAllowed);
	}
}

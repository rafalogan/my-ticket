import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { AddressController } from 'src/modules/address/address.controller';

export class AddressRoute extends Routes {
	constructor(options: RouteOptions, private addressController: AddressController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/address')
			.all(this.auth?.exec().authenticate())
			.post(this.addressController.save.bind(this.addressController))
			.all(methodNotAllowed);

		this.app
			.route('/address/user/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.addressController.listByUserOrPlace.bind(this.addressController))
			.all(methodNotAllowed);

		this.app
			.route('/address/place/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.addressController.listByUserOrPlace.bind(this.addressController))
			.all(methodNotAllowed);

		this.app
			.route('/address/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.addressController.list.bind(this.addressController))
			.put(this.addressController.save.bind(this.addressController))
			.delete(this.addressController.remove.bind(this.addressController))
			.all(methodNotAllowed);
	}
}

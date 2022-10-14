import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { SeatAddressController } from 'src/modules/seat-address/seat-address.controller';

export class SeatSddressRoute extends Routes {
	constructor(options: RouteOptions, private seatAddressController: SeatAddressController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/seat-address')
			.all(this.auth?.exec().authenticate())
			.post(this.seatAddressController.save.bind(this.seatAddressController))
			.all(methodNotAllowed);

		this.app
			.route('/seat-address/theater/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.seatAddressController.listAllByTheater.bind(this.seatAddressController))
			.all(methodNotAllowed);

		this.app
			.route('/seat-address/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.seatAddressController.list.bind(this.seatAddressController))
			.put(this.seatAddressController.edit.bind(this.seatAddressController))
			.delete(this.seatAddressController.remove.bind(this.seatAddressController))
			.all(methodNotAllowed);
	}
}

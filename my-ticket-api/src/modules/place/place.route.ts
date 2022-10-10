import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { PlaceController } from 'src/modules/place/place.controller';

export class PlaceRoute extends Routes {
	constructor(options: RouteOptions, private placeController: PlaceController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/places')
			.get(this.placeController.list.bind(this.placeController))
			.all(this.auth?.exec().authenticate())
			.post(this.placeController.save.bind(this.placeController))
			.all(methodNotAllowed);

		this.app
			.route('/places/:id')
			.get(this.placeController.list.bind(this.placeController))
			.all(this.auth?.exec().authenticate())
			.put(this.placeController.edit.bind(this.placeController))
			.delete(this.placeController.remove.bind(this.placeController))
			.all(methodNotAllowed);
	}
}

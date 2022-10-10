import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { TheaterController } from './theater.controller';

export class TheaterRoute extends Routes {
	constructor(options: RouteOptions, private theaterController: TheaterController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/theaters')
			.all(this.auth?.exec().authenticate())
			.post(this.theaterController.save.bind(this.theaterController))
			.all(methodNotAllowed);

		this.app.route('/theaters/place/:id').get(this.theaterController.listAllByPlace.bind(this.theaterController)).all(methodNotAllowed);

		this.app
			.route('/theaters/:id')
			.all(this.auth?.exec().authenticate())
			.put(this.theaterController.edit.bind(this.theaterController))
			.delete(this.theaterController.remove.bind(this.theaterController))
			.all(methodNotAllowed);
	}
}

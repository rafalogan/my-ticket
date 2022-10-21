import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { DurationController } from 'src/modules/duration/duration.controller';

export class DurationRoute extends Routes {
	constructor(options: RouteOptions, private durationController: DurationController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/durations')
			.all(this.auth?.exec().authenticate())
			.get(this.durationController.list.bind(this.durationController))
			.post(this.durationController.save.bind(this.durationController))
			.all(methodNotAllowed);

		this.app
			.route('/durations/:id')
			.all(this.auth?.exec().authenticate())
			.put(this.durationController.save.bind(this.durationController))
			.delete(this.durationController.remove.bind(this.durationController))
			.all(methodNotAllowed);
	}
}

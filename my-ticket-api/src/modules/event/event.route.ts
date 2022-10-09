import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { EventController } from 'src/modules/event/event.controller';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class EventRoute extends Routes {
	constructor(options: RouteOptions, private eventController: EventController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/events')
			.get(this.eventController.list.bind(this.eventController))
			.all(this.auth?.exec().authenticate())
			.post(this.eventController.save.bind(this.eventController))
			.all(methodNotAllowed);

		this.app
			.route('/events/:id')
			.get(this.eventController.list.bind(this.eventController))
			.all(this.auth?.exec().authenticate())
			.put(this.eventController.edit.bind(this.eventController))
			.delete(this.eventController.remove.bind(this.eventController))
			.all(methodNotAllowed);
	}
}

import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { TicketController } from 'src/modules/ticket/ticket.controller';

export class TicketRoute extends Routes {
	constructor(options: RouteOptions, private ticketController: TicketController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/tickets')
			.get(this.ticketController.list.bind(this.ticketController))
			.all(this.auth?.exec().authenticate())
			.post(this.ticketController.save.bind(this.ticketController))
			.all(methodNotAllowed);

		this.app
			.route('/tickets/:id')
			.get(this.ticketController.list.bind(this.ticketController))
			.all(this.auth?.exec().authenticate())
			.put(this.ticketController.edit.bind(this.ticketController))
			.delete(this.ticketController.remove.bind(this.ticketController))
			.all(methodNotAllowed);
	}
}

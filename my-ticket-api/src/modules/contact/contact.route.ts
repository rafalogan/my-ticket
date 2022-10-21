import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { ContactController } from 'src/modules/contact/contact.controller';

export class ContactRoute extends Routes {
	constructor(options: RouteOptions, private contactController: ContactController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/contacts')
			.post(this.contactController.save.bind(this.contactController))
			.all(this.auth?.exec().authenticate())
			.get(this.contactController.list.bind(this.contactController))
			.all(methodNotAllowed);

		this.app
			.route('/contacts/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.contactController.list.bind(this.contactController))
			.all(methodNotAllowed);
	}
}

import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { NewsletterController } from 'src/modules/newsletter/newsletter.controller';

export class NewsletterRoute extends Routes {
	constructor(options: RouteOptions, private newsletterController: NewsletterController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/newsletter')
			.post(this.newsletterController.save.bind(this.newsletterController))
			.all(this.auth?.exec().authenticate())
			.get(this.newsletterController.list.bind(this.newsletterController))
			.all(methodNotAllowed);

		this.app
			.route('/newsletter/:id')
			.delete(this.newsletterController.remove.bind(this.newsletterController))
			.all(this.auth?.exec().authenticate())
			.get(this.newsletterController.list.bind(this.newsletterController))
			.put(this.newsletterController.edit.bind(this.newsletterController))
			.all(methodNotAllowed);
	}
}

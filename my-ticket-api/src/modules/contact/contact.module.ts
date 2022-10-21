import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { ContactController } from 'src/modules/contact/contact.controller';
import { ContactRoute } from 'src/modules/contact/contact.route';
import { ContactService } from 'src/services';

export class ContactModule extends CommonModule {
	private readonly contactController: ContactController;
	private contactRoute: ContactRoute;

	constructor(options: ModuleOptions<ContactService>) {
		super();

		this.contactController = new ContactController(options.service);
		this.contactRoute = new ContactRoute(options, this.contactController);
	}

	exec = () => this.contactRoute.exec();
}

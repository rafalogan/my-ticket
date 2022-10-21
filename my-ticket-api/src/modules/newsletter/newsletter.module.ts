import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { NewsletterController } from 'src/modules/newsletter/newsletter.controller';
import { NewsletterRoute } from 'src/modules/newsletter/newsletter.route';
import { NewsletterService } from 'src/services';

export class NewsletterModule extends CommonModule {
	private readonly newsletterController: NewsletterController;
	private newsletterRoute: NewsletterRoute;

	constructor(options: ModuleOptions<NewsletterService>) {
		super();

		this.newsletterController = new NewsletterController(options.service);
		this.newsletterRoute = new NewsletterRoute(options, this.newsletterController);
	}

	exec = () => this.newsletterRoute.exec();
}

import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { DurationController } from './duration.controller';
import { DurationRoute } from 'src/modules/duration/duration.route';
import { DurationService } from 'src/services';

export class DurationModule extends CommonModule {
	private readonly durationController: DurationController;
	private durationRoute: DurationRoute;

	constructor(options: ModuleOptions<DurationService>) {
		super();

		this.durationController = new DurationController(options.service);
		this.durationRoute = new DurationRoute(options, this.durationController);
	}

	exec = () => this.durationRoute.exec();
}

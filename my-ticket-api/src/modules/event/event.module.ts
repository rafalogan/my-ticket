import { CommonModule } from 'src/core/abstracts';
import { EventController } from './event.controller';
import { EventRoute } from './event.route';
import { ModuleOptions } from 'src/repositories/types';
import { EventService } from 'src/services';

export class EventModule extends CommonModule {
	private readonly eventController: EventController;
	private eventRoute: EventRoute;

	constructor(options: ModuleOptions<EventService>) {
		super();

		this.eventController = new EventController(options.service);
		this.eventRoute = new EventRoute(options, this.eventController);
	}

	exec = () => this.eventRoute.exec();
}

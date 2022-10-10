import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { TheaterController } from 'src/modules/theater/theater.controller';
import { TheaterRoute } from 'src/modules/theater/theater.route';
import { TheaterService } from 'src/services';

export class TheaterModule extends CommonModule {
	private readonly theaterController: TheaterController;
	private theaterRoute: TheaterRoute;

	constructor(options: ModuleOptions<TheaterService>) {
		super();

		this.theaterController = new TheaterController(options.service);
		this.theaterRoute = new TheaterRoute(options, this.theaterController);
	}

	exec = () => this.theaterRoute.exec();
}

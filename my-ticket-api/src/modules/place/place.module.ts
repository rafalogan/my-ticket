import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { PlaceController } from 'src/modules/place/place.controller';
import { PlaceRoute } from 'src/modules/place/place.route';
import { PlaceService } from 'src/services';

export class PlaceModule extends CommonModule {
	private readonly placeController: PlaceController;
	private placeRoute: PlaceRoute;

	constructor(options: ModuleOptions<PlaceService>) {
		super();

		this.placeController = new PlaceController(options.service);
		this.placeRoute = new PlaceRoute(options, this.placeController);
	}

	exec = () => this.placeRoute.exec();
}

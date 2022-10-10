import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { CapacityController } from 'src/modules/capacity/capacity.controller';
import { CapacityRoute } from 'src/modules/capacity/capacity.route';
import { CapacityService } from 'src/services';

export class CapacityModule extends CommonModule {
	private readonly capacityController: CapacityController;
	private capacityRoute: CapacityRoute;

	constructor(options: ModuleOptions<CapacityService>) {
		super();

		this.capacityController = new CapacityController(options.service);
		this.capacityRoute = new CapacityRoute({ ...options }, this.capacityController);
	}

	exec = () => this.capacityRoute.exec();
}

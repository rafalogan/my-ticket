import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { PhoneController } from './phone.controller';
import { PhoneRoute } from 'src/modules/phone/phone.route';
import { PhoneService } from 'src/services';

export class PhoneModule extends CommonModule {
	private readonly phoneController: PhoneController;
	private phoneRoute: PhoneRoute;

	constructor(options: ModuleOptions<PhoneService>) {
		super();

		this.phoneController = new PhoneController(options.service);
		this.phoneRoute = new PhoneRoute(options, this.phoneController);
	}

	exec = () => this.phoneRoute.exec();
}

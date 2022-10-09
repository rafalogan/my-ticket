import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { AddressController } from './address.controller';
import { AddressRoute } from './address.route';
import { AddressService } from 'src/services';

export class AddressModule extends CommonModule {
	private readonly addressController: AddressController;
	private addressRoute: AddressRoute;

	constructor(options: ModuleOptions<AddressService>) {
		super();

		this.addressController = new AddressController(options.service);
		this.addressRoute = new AddressRoute(options, this.addressController);
	}

	exec = () => this.addressRoute.exec();
}

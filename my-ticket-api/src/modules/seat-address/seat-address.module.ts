import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { SeatAddressController } from 'src/modules/seat-address/seat-address.controller';
import { SeatSddressRoute } from 'src/modules/seat-address/seat-address.route';
import { SeatAddressService } from 'src/services';

export class SeatSddressModule extends CommonModule {
	private readonly seatAddressController: SeatAddressController;
	private seatAddressRoute: SeatSddressRoute;

	constructor(options: ModuleOptions<SeatAddressService>) {
		super();

		this.seatAddressController = new SeatAddressController(options.service);
		this.seatAddressRoute = new SeatSddressRoute(options, this.seatAddressController);
	}

	exec = () => this.seatAddressRoute.exec();
}

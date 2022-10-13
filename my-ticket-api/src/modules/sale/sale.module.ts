import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { SaleService } from 'src/services';
import { SaleController } from './sale.controller';
import { SaleRoute } from 'src/modules/sale/sale.route';

export class SaleModule extends CommonModule {
	private readonly saleController: SaleController;
	private saleRoute: SaleRoute;

	constructor(options: ModuleOptions<SaleService>) {
		super();

		this.saleController = new SaleController(options.service);
		this.saleRoute = new SaleRoute(options, this.saleController);
	}

	exec = () => this.saleRoute.exec();
}

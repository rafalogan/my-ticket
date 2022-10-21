import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { PaymentService } from 'src/services';
import { PaymentRoute } from './payment.route';
import { PaymentController } from 'src/modules/payment/payment.controller';

export class PaymentModule extends CommonModule {
	private readonly paymentController: PaymentController;
	private paymentRoute: PaymentRoute;

	constructor(options: ModuleOptions<PaymentService>) {
		super();

		this.paymentController = new PaymentController(options.service);
		this.paymentRoute = new PaymentRoute(options, this.paymentController);
	}

	exec = () => this.paymentRoute.exec();
}

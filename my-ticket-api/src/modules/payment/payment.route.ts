import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { PaymentController } from 'src/modules/payment/payment.controller';

export class PaymentRoute extends Routes {
	constructor(options: RouteOptions, private paymentController: PaymentController) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/payment-methods')
			.all(this.auth?.exec().authenticate())
			.get(this.paymentController.list.bind(this.paymentController))
			.post(this.paymentController.save.bind(this.paymentController))
			.all(methodNotAllowed);

		this.app
			.route('/payment-methods/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.paymentController.list.bind(this.paymentController))
			.put(this.paymentController.save.bind(this.paymentController))
			.delete(this.paymentController.remove.bind(this.paymentController))
			.all(methodNotAllowed);
	}
}

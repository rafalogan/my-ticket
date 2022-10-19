import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, setReadOptions } from 'src/utils';
import { PaymentService } from 'src/services';
import { Payment } from 'src/repositories/entities';
import { getIdByReq, getUserIdByToken } from 'src/core/handlers';

export class PaymentController extends Controller {
	constructor(private paymentService: PaymentService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.paymentService.validate(req.body);
		} catch (err: any) {
			return responseApiError({ res, err, message: err.message, status: httpStatus.BAD_REQUEST });
		}

		const data = new Payment(req.body);
		data.userId = getUserIdByToken(req) as number;

		this.paymentService
			.save(data)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const data = new Payment(req.body, id);

		this.paymentService
			.save(data)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);
		options.userId = getUserIdByToken(req);

		this.paymentService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.paymentService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setParamsOrder, setReadOptions } from 'src/utils';
import { PhoneService } from 'src/services';
import { Phone } from 'src/repositories/entities';
import { getIdByReq, onLog } from 'src/core/handlers';

export class PhoneController extends Controller {
	constructor(private phoneService: PhoneService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.phoneService.validate(req.body);
		} catch (err) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const phone = new Phone(req.body);

		this.phoneService
			.save(phone)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const phone = new Phone(req.body, id);

		this.phoneService
			.save(phone)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.phoneService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	listByPlaceOrUser(req: Request, res: Response) {
		const params = setParamsOrder(req);

		this.phoneService
			.findPonhesUserOrPlaceId(params.where as string, params.value)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.phoneService
			.delete(id)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

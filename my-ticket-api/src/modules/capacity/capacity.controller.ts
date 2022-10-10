import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError } from 'src/utils';
import { CapacityService } from 'src/services';
import { Capacity } from 'src/repositories/entities';
import { getIdByReq } from 'src/core/handlers';

export class CapacityController extends Controller {
	constructor(private capacityService: CapacityService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.capacityService.validate(req.body);
		} catch (err) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const capacity = new Capacity(req.body);

		this.capacityService
			.save(capacity)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const capacity = new Capacity(req.body, id);

		this.capacityService
			.save(capacity)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const theaterId = getIdByReq(req);

		this.capacityService
			.findAllByWhere('theaterId', theaterId)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.capacityService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

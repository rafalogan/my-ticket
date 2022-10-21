import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { DurationService } from 'src/services';
import { Duration } from 'src/repositories/entities';
import { getIdByReq, onLog } from 'src/core/handlers';

export class DurationController extends Controller {
	constructor(private durationService: DurationService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.durationService.validate(req.body);
		} catch (err) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const duration = new Duration(req.body);
		onLog('duration', duration);

		this.durationService
			.save(duration)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const duration = new Duration(req.body, id);

		this.durationService
			.save(duration)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.query.theater);

		this.durationService
			.findAllByWhere('theaterId', id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.durationService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { TheaterService } from 'src/services';
import { Theater } from 'src/repositories/entities';
import { getIdByReq } from 'src/core/handlers';

export class TheaterController extends Controller {
	constructor(private theaterService: TheaterService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.theaterService.validate(req.body);
		} catch (err) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const theater = new Theater(req.body);

		this.theaterService
			.save(theater)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const theater = new Theater(req.body, id);

		this.theaterService
			.save(theater)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.theaterService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	listAllByPlace(req: Request, res: Response) {
		const placeId = getIdByReq(req);

		this.theaterService
			.theatersByPlace(placeId)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.theaterService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

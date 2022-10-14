import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { PlaceService } from 'src/services';
import { Place } from 'src/repositories/entities';
import { getUserIdByToken } from 'src/core/handlers';

export class PlaceController extends Controller {
	constructor(private placeService: PlaceService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.placeService.validate(req.body);
		} catch (err) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const place = new Place(req.body);
		place.userId = getUserIdByToken(req) as number;

		this.placeService
			.save(place)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = Number(req.params.id);
		const place = new Place(req.body, id);

		this.placeService
			.save(place)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	listAllByUser(req: Request, res: Response) {
		const userId = getUserIdByToken(req) as number;
		const options = setReadOptions(req);
		this.placeService
			.findAllByUser(userId, options)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = this.setPlaceRreadOptions(req);

		this.placeService
			.read(options)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.placeService
			.delete(id)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	private setPlaceRreadOptions = (req: Request) => ({
		...setReadOptions(req),
		userId: getUserIdByToken(req),
	});
}

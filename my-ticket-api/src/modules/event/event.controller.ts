import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { EventService } from 'src/services';
import { responseApi, responseApiError, setReadOptions } from 'src/utils';
import { EventEntity } from 'src/repositories/entities';
import { getUserIdByToken } from 'src/core/handlers';

export class EventController extends Controller {
	constructor(private eventService: EventService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.eventService.validate(req.body);
		} catch (err) {
			return responseApi(res, err);
		}

		const event = new EventEntity(req.body);
		event.userId = getUserIdByToken(req);

		this.eventService
			.save(event)
			.then(result => responseApi(res, result))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const event = new EventEntity(req.body, Number(req.params.id));
		event.userId = getUserIdByToken(req);

		this.eventService
			.save(event)
			.then(result => responseApi(res, result))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.eventService
			.read(options)
			.then(result => responseApi(res, result))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.eventService
			.delete(id)
			.then(result => responseApi(res, result))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

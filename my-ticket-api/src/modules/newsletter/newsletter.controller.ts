import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { NewsletterService } from 'src/services';
import { Newsletter } from 'src/repositories/entities';
import { getIdByReq } from 'src/core/handlers';

export class NewsletterController extends Controller {
	constructor(private newsletterService: NewsletterService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.newsletterService.validate(req.body);
		} catch (err: any) {
			return responseApiError({ res, err, message: err.message });
		}

		const data = new Newsletter(req.body);

		this.newsletterService
			.save(data)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const data = new Newsletter(req.body, id);

		this.newsletterService
			.save(data)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.newsletterService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.newsletterService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

import httpStatus from 'http-status';
import { Request, response, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { ContactService } from 'src/services';
import { Contact } from 'src/repositories/entities';
import { methodNotAllowed } from 'src/core/routes/notfound.route';
import { ReadContactOptions } from 'src/repositories/types';

export class ContactController extends Controller {
	constructor(private contactService: ContactService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.contactService.validate(req.body);
		} catch (err: any) {
			return responseApiError({ res, err, message: err.message });
		}

		const data = new Contact(req.body);

		this.contactService
			.save(data)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		methodNotAllowed(req, res);
	}

	list(req: Request, res: Response) {
		const options: ReadContactOptions = { ...setReadOptions(req) };
		options.saleId = Number(req.query.saleId);

		this.contactService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		methodNotAllowed(req, res);
	}
}

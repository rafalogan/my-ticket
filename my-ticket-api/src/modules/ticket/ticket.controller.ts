import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { TicketService } from 'src/services';
import { Ticket } from 'src/repositories/entities';
import { getIdByReq } from 'src/core/handlers';

export class TicketController extends Controller {
	constructor(private ticketService: TicketService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.ticketService.validate(req.body);
		} catch (err) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const ticket = new Ticket(req.body);

		this.ticketService
			.save(ticket)
			.then(data => responseApi(res, data, data.staus))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const ticket = new Ticket(req.body, id);

		this.ticketService
			.save(ticket)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.ticketService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.ticketService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { DatabaseException, deleteField, responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { TicketService } from 'src/services';
import { Ticket } from 'src/repositories/entities';
import { getIdByReq, getUserIdByToken, onLog } from 'src/core/handlers';

export class TicketController extends Controller {
	constructor(private ticketService: TicketService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.ticketService.validate(req.body);
		} catch (err) {
			return this.setTicketResponse(res, err, httpStatus.BAD_REQUEST);
		}

		const ticket = new Ticket(req.body);
		ticket.userId = getUserIdByToken(req);

		this.ticketService
			.save(ticket)
			.then(data => this.setTicketResponse(res, data, data.staus))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const ticket = new Ticket(req.body, id);

		this.ticketService
			.save(ticket)
			.then(data => this.setTicketResponse(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		if (req.query.event || req.query.place || req.query.theater || req.query.duration) return this.listByEvent(req, res);

		const options = setReadOptions(req);

		this.ticketService
			.read(options)
			.then(data => this.setTicketResponse(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.ticketService
			.delete(id)
			.then(data => this.setTicketResponse(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	private listByEvent(req: Request, res: Response) {
		const value = Number(req.query.event || req.query.place || req.query.theater || req.query.duration);
		const by = this.setBy(req) as string;

		this.ticketService
			.findTicketsWhere(by, value)
			.then(data => this.setTicketResponse(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	private setBy(req: Request) {
		if (req.query.event) return 'event';
		if (req.query.place) return 'place';
		if (req.query.theater) return 'theater';
		if (req.query.duration) return 'duration';
	}

	private setTicketResponse(res: Response, value: any, status?: number) {
		if (value instanceof ResponseException || value instanceof DatabaseException) return responseApi(res, value);
		if ('data' in value) value.data = value.data.map(this.noUserIdArray);
		if (Array.isArray(value)) value.map(this.noUserIdArray);

		deleteField(value, 'userId');
		return responseApi(res, value, status);
	}

	private noUserIdArray(value: any) {
		deleteField(value, 'userId');
		return value;
	}
}

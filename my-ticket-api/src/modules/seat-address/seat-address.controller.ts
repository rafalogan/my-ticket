import httpStatus from 'http-status';
import { Request, response, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { SeatAddressService } from 'src/services';
import { SeatAddress } from 'src/repositories/entities';
import { getIdByReq } from 'src/core/handlers';

export class SeatAddressController extends Controller {
	constructor(private seatAddressService: SeatAddressService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.seatAddressService.validate(req.body);
		} catch (err) {
			return responseApi(res, err);
		}

		const seatAddress = new SeatAddress(req.body);

		this.seatAddressService
			.save(seatAddress)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const seatAddress = new SeatAddress(req.body, id);

		this.seatAddressService
			.save(seatAddress)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	listAllByTheater(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.seatAddressService
			.findAllByWhere('theaterId', id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.seatAddressService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.seatAddressService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

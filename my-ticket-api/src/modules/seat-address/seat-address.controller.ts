import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { deleteField, messages, responseApi, responseApiError, setReadOptions } from 'src/utils';
import { SeatAddressService } from 'src/services';
import { SeatAddress } from 'src/repositories/entities';
import { getIdByReq, onLog } from 'src/core/handlers';
import { ISeatAddress } from 'src/repositories/types';

export class SeatAddressController extends Controller {
	constructor(private seatAddressService: SeatAddressService) {
		super();
	}

	async save(req: Request, res: Response) {
		if (req.body.total) return this.setSeatsByTotal(req, res);
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
		const id = Number(req.query.theater);

		this.seatAddressService
			.findAllByWhere('theaterId', id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		if (!options.id) return responseApiError({ res, message: messages.requires('O id'), status: httpStatus.BAD_REQUEST });

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

	private async setSeatsByTotal(req: Request, res: Response) {
		const total = Number(req.body.total);
		deleteField(req.body, 'total');
		const data = req.body;
		const result = this.setDataObject(data, total);

		onLog('Result', result);

		try {
			result.forEach(this.seatAddressService.validate);
		} catch (err: any) {
			return responseApiError({ res, err, message: err.message });
		}

		const response = result.map(i => new SeatAddress(i)).map(i => this.seatAddressService.save(i));
		onLog('response', response);

		Promise.all(response)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	private setDataObject(data: ISeatAddress, total: number): ISeatAddress[] {
		const result = [];

		for (let i = 0; i < total; i++) {
			result.push({ ...data, seat: i + 1 });
		}

		return result;
	}
}

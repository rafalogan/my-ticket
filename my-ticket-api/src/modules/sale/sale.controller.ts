import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, setReadOptions } from 'src/utils';
import { SaleService } from 'src/services';
import { Sale } from 'src/repositories/entities';
import { getIdByReq, getUserIdByToken, onLog } from 'src/core/handlers';
import httpStatus from 'http-status';
import { ReadSelesOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class SaleController extends Controller {
	constructor(private saleService: SaleService) {
		super();
	}

	async save(req: Request, res: Response) {
		onLog('chegou');
		try {
			await this.saleService.validate(req.body);
		} catch (err) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const data = new Sale(req.body);
		data.userId = getUserIdByToken(req);

		onLog('data', data);

		this.saleService
			.save(data)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		methodNotAllowed(req, res);
	}

	list(req: Request, res: Response) {
		const options: ReadSelesOptions = { ...setReadOptions(req) };
		options.userId = getUserIdByToken(req);
		options.paginate = true;
		options.code = req.query.code as string;

		this.saleService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.saleService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

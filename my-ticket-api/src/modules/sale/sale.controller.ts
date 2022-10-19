import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, setReadOptions } from 'src/utils';
import { SaleService } from 'src/services';
import { Sale } from 'src/repositories/entities';
import { getIdByReq, getUserIdByToken, onLog } from 'src/core/handlers';
import { CompleteSaleModel } from 'src/repositories/models';

export class SaleController extends Controller {
	constructor(private saleService: SaleService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.saleService.validate(req.body.sale);
		} catch (err) {
			return responseApi(res, err);
		}

		const data = new Sale(req.body);
		data.userId = getUserIdByToken(req) as number;

		this.saleService
			.save(data)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const sale = new Sale(req.body, id);

		this.saleService
			.save(sale)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	listByUser(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.saleService
			.findAllByWhere('userId', id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	listByCode(req: Request, res: Response) {
		const code = req.params.code;

		this.saleService
			.findAllByWhere('code', code)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

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

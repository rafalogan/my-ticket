import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';

export class saleController extends Controller {
	constructor(private saleService: ) {
		super();
	}

	save(req: Request, res: Response) {}

  edit(req: Request, res: Response) {}

  list(req: Request, res: Response) {}

  remove(req: Request, res: Response) {}
}

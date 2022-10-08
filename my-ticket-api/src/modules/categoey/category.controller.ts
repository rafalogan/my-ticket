import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { CategoryService } from 'src/services';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { Category } from 'src/repositories/entities';

export class CategoryController extends Controller {
	constructor(private categoryService: CategoryService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.categoryService.validate(req.body);
		} catch (err: any) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const category = new Category(req.body);

		this.categoryService
			.save(category)
			.then(result => responseApi(res, result))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = Number(req.params.id);
		const data = new Category(req.body, id);

		this.categoryService
			.save(data)
			.then(result => responseApi(res, result))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.categoryService
			.read(options)
			.then(result => responseApi(res, result))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.categoryService
			.delete(id)
			.then(result => responseApi(res, result, result instanceof ResponseException ? httpStatus.FORBIDDEN : httpStatus.OK))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

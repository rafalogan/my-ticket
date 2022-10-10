import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { UserService } from 'src/services';
import { deleteField, messages, responseApi, responseApiError, setReadOptions } from 'src/utils';

export class UserController extends Controller {
	constructor(private userService: UserService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.userService.validateNewUser(req.body);
		} catch (err: any) {
			return this.response(res, err, httpStatus.BAD_REQUEST);
		}

		const user = this.userService.set(req.body);

		this.userService
			.save(user)
			.then(data => this.response(res, data))
			.catch(err => responseApiError({ res, message: messages.user.error.noSave, err }));
	}

	edit(req: Request, res: Response) {
		const user = this.userService.set(req.body, Number(req.params.id));

		this.userService
			.save(user)
			.then(result => this.response(res, result))
			.catch(err => responseApiError({ res, message: messages.user.error.noSave, err }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.userService
			.read(options)
			.then(data => this.response(res, data))
			.catch(err => responseApiError({ res, message: messages.user.error.notFound, err }));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.userService
			.delete(id)
			.then(result => this.response(res, result))
			.catch(err => responseApiError({ res, message: messages.user.error.noDelete(id), err }));
	}

	private response(res: Response, data: any, status = httpStatus.INTERNAL_SERVER_ERROR) {
		if (data.password) deleteField(data, 'password');
		return responseApi(res, data, status);
	}
}

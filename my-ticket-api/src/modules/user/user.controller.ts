import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { UserService } from 'src/services';
import { onLog, ResponseHandle } from 'src/core/handlers';
import { deleteField, messages, ResponseException, setReadOptions } from 'src/utils';

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
		onLog('user to save', user);

		this.userService
			.save(user)
			.then(data => this.response(res, data))
			.catch(err => ResponseHandle.onError({ res, message: messages.user.error.noSave, err }));
	}

	edit(req: Request, res: Response) {
		const user = this.userService.set(req.body, Number(req.params.id));

		this.userService
			.save(user)
			.then(result => this.response(res, result))
			.catch(err => ResponseHandle.onError({ res, message: messages.user.error.noSave, err }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.userService
			.read(options)
			.then(data => this.response(res, data))
			.catch(err => ResponseHandle.onError({ res, message: messages.user.error.notFound, err }));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.userService
			.delete(id)
			.then(result => this.response(res, result))
			.catch(err => ResponseHandle.onError({ res, message: messages.user.error.noDelete(id), err }));
	}

	private response(res: Response, data: any, status = httpStatus.INTERNAL_SERVER_ERROR) {
		if (data.password) deleteField(data, 'password');
		if (data instanceof ResponseException) return ResponseHandle.onError({ res, message: data.message, err: data.error, status });

		return ResponseHandle.onSuccess({ res, data });
	}
}

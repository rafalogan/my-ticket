import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { ProfileService } from 'src/services';
import { messages, responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';
import { onLog } from 'src/core/handlers';

export class ProfileController extends Controller {
	constructor(private profileService: ProfileService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.profileService.profileValidate(req.body);
			onLog('validate', await this.profileService.profileValidate(req.body));
		} catch (err) {
			return this.response(res, err, httpStatus.BAD_REQUEST);
		}

		const profile = this.profileService.set(req.body);

		this.profileService
			.save(profile)
			.then(result => this.response(res, result))
			.catch(err => responseApiError({ res, err, message: messages.profile.error.noSave(profile.name) }));
	}

	async edit(req: Request, res: Response) {
		const profile = this.profileService.set(req.body, Number(req.params.id));

		this.profileService
			.save(profile)
			.then(result => this.response(res, result))
			.catch(err => responseApiError({ res, err, message: messages.profile.error.noEdit(Number(profile.id)) }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.profileService
			.read(options)
			.then(data => this.response(res, data))
			.catch(err => responseApiError({ res, err, message: messages.profile.error.notList }));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);
		const toReplace = Number(req.query.moveTo);

		if (!toReplace) {
			const exception = new ResponseException(messages.requires('Novo Perfil'));

			return this.response(res, exception, httpStatus.BAD_REQUEST);
		}

		this.profileService
			.remove(id, toReplace)
			.then(result => this.response(res, result))
			.catch(err => responseApiError({ res, message: messages.profile.error.noDel(id), err }));
	}

	private response(res: Response, data: any, status = httpStatus.INTERNAL_SERVER_ERROR) {
		return responseApi(res, data, status);
	}
}

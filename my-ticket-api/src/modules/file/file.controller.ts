import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { filterRawFile, responseApi, responseApiError, setReadOptions } from 'src/utils';
import { FileService } from 'src/services';
import { IFile } from 'src/repositories/types';
import { FileEntity } from 'src/repositories/entities';
import { getIdByReq, onLog } from 'src/core/handlers';

export class FileController extends Controller {
	constructor(private fileService: FileService) {
		super();
	}

	async save(req: Request, res: Response) {
		const raw = filterRawFile(req) as IFile;
		try {
			await this.fileService.validate(raw);
		} catch (err) {
			return responseApi(res, err);
		}

		const file = new FileEntity(raw);
		onLog('file', file);

		this.fileService
			.save(file)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const raw = filterRawFile(req) as IFile;
		const file = new FileEntity(raw, id);

		this.fileService
			.save(file)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.fileService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.fileService
			.delete(id)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}
}

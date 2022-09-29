import { Response } from 'express';
import httpStatus from 'http-status';
import { onError, onWarn } from 'src/core/handlers/log.handler';
import { ErrorResponseParams, SucessResponseParams } from 'src/repositories/types';

export class ResponseHandle {
	static status = httpStatus;

	constructor() {}

	static onSuccess(res: Response, data: any, options?: SucessResponseParams) {
		return res.status(options?.status || this.status.OK).json(data);
	}

	static onError(res: Response, message: string, options?: ErrorResponseParams) {
		const status = options && options.status ? options.status : this.status.INTERNAL_SERVER_ERROR;

		this.setLog(status, message, options?.err);
		return res.status(status).send({ status, message });
	}

	static setLog(status: number, message: string, error?: Error) {
		return status >= 400 && status < 500 ? onWarn(message, error) : onError(message, error);
	}
}

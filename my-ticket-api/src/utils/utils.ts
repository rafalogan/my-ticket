import dotenv from 'dotenv';
import httpStatus from 'http-status';
import { Response } from 'express';

import { Environment } from 'src/config';
import { ErrorResponseParams, Knexfile } from 'src/repositories/types';
import { DatabaseException, ResponseException } from 'src/utils/exceptions';
import { onError, onLog, ResponseHandle } from 'src/core/handlers';
import { messages } from 'src/utils/messages';

const isValid = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

export const execDotenv = () => (isValid ? dotenv.config({ path: process.env.NODE_ENV === 'test' ? './.env.testing' : './.env' }) : null);
export const getKnexProps = (env: Environment, props?: Knexfile) => {
	const { client, host, database, password, port, user } = env.database;
	const connection = { database, host, user, password, port };
	const useNullAsDefault = props?.useNullAsDefault || true;

	return { ...props, client, connection, useNullAsDefault } as Knexfile;
};

export const responseApi = (res: Response, data: any, status = httpStatus.INTERNAL_SERVER_ERROR) => {
	onLog('REsponse Api Data', data);

	if (data instanceof ResponseException || data instanceof DatabaseException) {
		return responseApiError({ res, message: data.message, err: data.error, status });
	}

	return ResponseHandle.onSuccess({ res, data });
};

export const responseApiError = (options: ErrorResponseParams) => ResponseHandle.onError(options);

export const responseDataBaseCriate = (response: any, data?: any) => {
	if (response.severity === 'ERROR') return new DatabaseException(`${messages.noSave}\n${response.detail}`, response);
	return { commad: response.command, rowCount: response.rowCount, message: messages.successSave, data };
};

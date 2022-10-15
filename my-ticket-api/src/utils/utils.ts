import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import dotenv from 'dotenv';
import httpStatus from 'http-status';
import { Response } from 'express';

import { Environment } from 'src/config';
import { ErrorResponseParams, Knexfile } from 'src/repositories/types';
import { DatabaseException, ResponseException } from 'src/utils/exceptions';
import { onLog, ResponseHandle } from 'src/core/handlers';
import { messages } from 'src/utils/messages';

const isValid = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

export const execDotenv = () => (isValid ? dotenv.config({ path: process.env.NODE_ENV === 'test' ? './.env.testing' : './.env' }) : null);
export const createUploadsDir = () => {
	const path = resolve(__dirname, '..', '..', 'tmp', 'uploads');
	const exists = existsSync(path);

	if (process.env.STORAGE_TYPE === 'local' && !exists) return mkdir(path, { recursive: true });
	return;
};

export const getKnexProps = (env: Environment, props?: Knexfile) => {
	const { client, host, database, password, port, user } = env.database;
	const connection = { database, host, user, password, port };
	const useNullAsDefault = props?.useNullAsDefault || true;

	return { ...props, client, connection, useNullAsDefault } as Knexfile;
};

export const responseApi = (res: Response, data: any, status?: number) => {
	if (data instanceof ResponseException || data instanceof DatabaseException) {
		return responseApiError({ res, message: data.message, err: data.error, status: status || httpStatus.FORBIDDEN });
	}

	return ResponseHandle.onSuccess({ res, data, status: status || httpStatus.OK });
};

export const responseApiError = (options: ErrorResponseParams) => ResponseHandle.onError(options);

export const responseDataBaseUpdate = (response: any, data?: any) => {
	if (!response) return response;
	if (response.severity === 'ERROR') return new DatabaseException(response.detail ? response.detail : messages.noEdit);
	return { id: data.id, edit: response === 1, message: messages.successEdit, data };
};

export const responseDataBaseCreate = (response: any, data?: any) => {
	if (!response) return response;
	if (response.severity === 'ERROR') return new DatabaseException(`${messages.noSave}`, response);
	return { commad: response.command, rowCount: response.rowCount, message: messages.successSave, data };
};

export const responseNotFoundRegisters = new ResponseException(messages.notFoundRegister, {
	status: httpStatus.FORBIDDEN,
	message: messages.notFoundRegister,
});

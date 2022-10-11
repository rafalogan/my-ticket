import httpStatus from 'http-status';
import isEmpty from 'is-empty';
import bcrypt from 'bcrypt';

import { DatabaseException, ResponseException } from 'src/utils/exceptions';
import { Credentials, UserModel } from 'src/repositories/models';
import { IsMachValidateOptions } from 'src/repositories/types';
import { User } from 'src/repositories/entities';

export const existsOrError = (value: any, message: string): void | ResponseException => {
	if (isEmpty(value)) throw new ResponseException(message);
	if (!value) throw new ResponseException(message);
	if (Array.isArray(value) && value.length === 0) throw new ResponseException(message);
	if (typeof value === 'string' && !value.trim()) throw new ResponseException(message);
	if (typeof value === 'number' && !Number(value)) throw new ResponseException(message);
	if (value instanceof ResponseException || value instanceof DatabaseException) throw value;
};

export const notExistisOrError = (value: any, message: string) => {
	try {
		existsOrError(value, message);
	} catch (message) {
		return;
	}

	throw new ResponseException(message);
};

export const equalsOrError = (valueA: any, valueB: any, message: string) => {
	if (valueA !== valueB) throw new ResponseException(message);
};

export const isMatchOrError = (data: IsMachValidateOptions) => {
	if (!isMatch(data.credentials, data.user)) throw new ResponseException(data.message);
};

export const isMatch = (credentials: Credentials, user: UserModel | User) => bcrypt.compareSync(credentials.password, user.password);

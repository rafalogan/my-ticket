import isEmpty from 'is-empty';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from 'src/repositories/entities';
import { ResponseException } from 'src/utils/exceptions';
import { CredentialsDomain } from 'src/repositories/types';
import { onLog } from 'src/util/log';
import { UserModel } from 'src/repositories/models';

const isValid = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

export const existsOrError = (value: any, message: string): void | ResponseException => {
	if (isEmpty(value)) throw new ResponseException(message);
	if (!value) throw new ResponseException(message);
	if (Array.isArray(value) && value.length === 0) throw new ResponseException(message);
	if (typeof value === 'string' && !value.trim()) throw new ResponseException(message);
	if (typeof value === 'number' && !Number(value)) throw new ResponseException(message);
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

export const execDotenv = () => (isValid ? dotenv.config({ path: process.env.NODE_ENV === 'test' ? './.env.testing' : './.env' }) : null);

export const isMatch = (credentials: CredentialsDomain, user: UserModel) => bcrypt.compareSync(credentials.password, user.password);

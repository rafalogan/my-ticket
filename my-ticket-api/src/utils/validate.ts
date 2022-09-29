import isEmpty from 'is-empty';
import bcrypt from 'bcrypt';

import { ResponseException } from 'src/utils/exceptions';

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

// export const isMatch = (credentials: CredentialsDomain, user: UserModel) => bcrypt.compareSync(credentials.password, user.password);

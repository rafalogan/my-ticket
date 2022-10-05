export class DatabaseException extends Error {
	name = 'DatabaseException';

	constructor(message: string) {
		super(`${message}: in Database`);
	}
}

export class ResponseException extends Error {
	name = 'ResponseException';
	error: any;

	constructor(message: string, error?: any) {
		super(message);
	}
}

export class AuthException extends Error {
	name = AuthException.name;
	constructor(message: string) {
		super(`${message}: in Auth`);
	}
}

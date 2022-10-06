export class DatabaseException extends Error {
	name = 'DatabaseException';
	error: any;

	constructor(message: string, error?: any) {
		super(`${message}: in Database`);

		this.error = error;
	}
}

export class ResponseException extends Error {
	name = 'ResponseException';
	error: any;

	constructor(message: string, error?: any) {
		super(message);

		this.error = error;
	}
}

export class AuthException extends Error {
	name = AuthException.name;
	constructor(message: string) {
		super(`${message}: in Auth`);
	}
}

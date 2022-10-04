import { Request } from 'express';
import jwt from 'jwt-simple';
import httpStatus from 'http-status';

import { UserService } from './user.service';
import { ICredentials, ValidateTokenResponse } from 'src/repositories/types';
import { User } from 'src/repositories/entities';
import { Credentials, Payload } from 'src/repositories/models';
import { existsOrError, isMatch, messages } from 'src/utils';
import { ProfileService } from './profile.service';
import { onLog } from 'src/core/handlers';

export class AuthService {
	constructor(private authsecret: string, private userService: UserService, private profileService: ProfileService) {}

	validateCredentials(credentials: ICredentials) {
		try {
			existsOrError(credentials.email, messages.auth.error.requires);
			existsOrError(credentials.password, messages.auth.error.requires);
		} catch (err) {
			return err;
		}
	}

	setCredentials(credentials: ICredentials) {
		return new Credentials(credentials);
	}

	async verifyCredentials(credentials: Credentials) {
		const findDB = await this.userService.findUserByEmail(credentials.email);
		onLog('user From Database: ', findDB);

		existsOrError(findDB, 'User not found');
		const user = new User(findDB);
		onLog('user Entity: ', user);

		if (isMatch(credentials, user)) {
			const payload = new Payload(user);
			return { ...payload, token: jwt.encode(payload, this.authsecret) };
		}
	}

	async signupOnApp(user: User) {
		const profile = await this.profileService.findProfileByName('client');
		user.profileId = profile.id;

		return this.userService
			.save(user)
			.then(result => result)
			.catch(err => err);
	}

	getPayload(req: Request) {
		const token = this.extractToken(req);
		return token ? this.decodeToken(token) : undefined;
	}

	async tokenIsValid(req: Request): Promise<ValidateTokenResponse> {
		const token = this.extractToken(req);
		const payload = token ? this.decodeToken(token) : undefined;
		const valid = payload?.exp ? new Date(payload.exp * 1000) > new Date() : false;
		const status = valid ? httpStatus.OK : httpStatus.UNAUTHORIZED;

		existsOrError(token, 'Token is not valid or not found.');
		existsOrError(payload, 'Payload is not found.');

		return valid
			? { valid, status, message: messages.auth.success.tokenIsValid, token }
			: { valid, status, message: messages.auth.error.tokenNoValid, token };
	}

	private extractToken(req: Request) {
		const { authorization } = req.headers;
		const [agent, token] = authorization ? authorization.split(' ') : [];

		return agent === 'Bearer' ? token : undefined;
	}

	private decodeToken(token: string): Payload {
		const dataRaw = jwt.decode(token, this.authsecret);

		return new Payload(dataRaw);
	}
}

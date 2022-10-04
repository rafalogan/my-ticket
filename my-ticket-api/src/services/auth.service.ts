import { Request } from 'express';
import jwt from 'jwt-simple';
import httpStatus from 'http-status';

import { UserService } from './user.service';
import { ICredentials, IUser, ValidateTokenResponse } from 'src/repositories/types';
import { User } from 'src/repositories/entities';
import { Credentials, Payload } from 'src/repositories/models';
import { existsOrError, isMatch, messages, ResponseException } from 'src/utils';
import { ProfileService } from './profile.service';
import { onLog } from 'src/core/handlers';
import { error } from 'winston';

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

		existsOrError(findDB, 'User not found');
		const user = new User(findDB);

		if (isMatch(credentials, user)) {
			const payload = new Payload(user);
			return { ...payload, token: jwt.encode(payload, this.authsecret) };
		}
	}

	async signupOnApp(user: IUser, profile?: string) {
		try {
			const profileToId = await this.profileService.findProfileByName(profile?.toLowerCase() || 'cliente');

			onLog('perfil', profileToId);
			existsOrError(profileToId, messages.profile.error.notFound(profile?.toUpperCase() || 'cliente'));
			await this.userService.validateNewUser(user);

			user.profileId = profileToId.id;
		} catch (err) {
			return err;
		}

		const userToSave = this.userService.set(user);
		onLog('User to save:', user);

		return this.userService
			.save(userToSave)
			.then(result => (result.result.rowCount && result.result.rowCount !== 0 ? result : new ResponseException(messages.user.error.noSave)))
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

		existsOrError(token, messages.auth.error.notFoundToken);
		existsOrError(payload, messages.auth.error.notFoundPayload);

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

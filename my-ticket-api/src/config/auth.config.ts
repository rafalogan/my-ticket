import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import passport from 'passport';

import { User } from 'src/repositories/entities';
import { deleteField } from 'src/utils';
import { UserService } from 'src/services';
import { IAuthConfig } from 'src/repositories/types';
import { Payload, UserModel } from 'src/repositories/models';
import { onLog } from 'src/core/handlers';

export class AuthConfig {
	auth: IAuthConfig;

	private readonly params: StrategyOptions;

	constructor(private authSecret: string, private userService: UserService) {
		this.params = this.setStrategyOptions();
	}

	exec(): IAuthConfig {
		const strategy = new Strategy(this.params, this.verify.bind(this));
		const session = false;

		passport.use(strategy);
		return {
			authenticate: () => {
				onLog('authenticate');
				return passport.authenticate('jwt', { session });
			},
		};
	}

	verify(payload: Payload, done: VerifiedCallback) {
		const id = Number(payload.id);

		onLog('id to verify', id);
		this.userService
			.read({ id })
			.then(data => done(null, data instanceof UserModel ? this.setUserNoPass(data) : false))
			.catch(error => done(error, false));
	}

	private setUserNoPass(user: UserModel) {
		deleteField(user, 'password');
		return user;
	}

	private setStrategyOptions(): StrategyOptions {
		const secretOrKey = this.authSecret;
		const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

		return { secretOrKey, jwtFromRequest };
	}
}

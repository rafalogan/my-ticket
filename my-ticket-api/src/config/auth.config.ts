import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import passport from 'passport';

import { User } from 'src/repositories/entities';
import { deleteField } from 'src/utils';
import { UserService } from 'src/services';
import { IAuthConfig } from 'src/repositories/types';
import { Payload } from 'src/repositories/models';

export class AuthConfig {
	auth: IAuthConfig;

	private readonly params: StrategyOptions;

	constructor(private authSecret: string, private userService: UserService) {
		this.params = this.setStrategyOptions();
		this.auth = this.exec();
	}

	exec(): IAuthConfig {
		const strategy = new Strategy(this.params, this.verify.bind(this));
		const session = false;

		passport.use(strategy);
		return {
			authenticate: () => passport.authenticate('jwt', { session }),
		};
	}

	verify(payload: Payload, done: VerifiedCallback) {
		const id = Number(payload.id);
		this.userService
			.read({ id })
			.then(data => done(null, data instanceof User ? deleteField(data, 'password') : false))
			.catch(error => done(error, false));
	}

	private setStrategyOptions(): StrategyOptions {
		const secretOrKey = this.authSecret;
		const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

		return { secretOrKey, jwtFromRequest };
	}
}

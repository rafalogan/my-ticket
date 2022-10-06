import { Knex } from 'knex';

import { AuthService, CategoryService, InitService, ProfileService, UserService } from 'src/services';
import { Environment } from 'src/config';
import { RedisClientType } from 'redis';

import { categoryFields, profileFields, userFields } from 'src/utils';

export class ServicesFactory {
	initService: InitService;
	userService: UserService;
	profileService: ProfileService;
	authService: AuthService;
	categoryService: CategoryService;

	constructor(private env: Environment, private conn: Knex, private client: RedisClientType) {
		this.initService = new InitService();
		this.userService = new UserService({ ...this.setServiceOptions('users', userFields) });
		this.profileService = new ProfileService({ ...this.setServiceOptions('profiles', profileFields) }, this.userService);
		this.authService = new AuthService(this.env.security.authsecret, this.userService, this.profileService);
		this.categoryService = new CategoryService(this.setServiceOptions('categories', categoryFields));
	}

	private setServiceOptions(table: string, fields: string[]) {
		const { nodeEnv, cache, security } = this.env;
		const { enable: active, time } = cache;
		const { saltRounds: salt } = security;

		return { conn: this.conn, table, fields, client: this.client, active, nodeEnv, time, salt };
	}
}

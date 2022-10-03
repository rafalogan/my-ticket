import { Knex } from 'knex';

import { InitService, UserService } from 'src/services';
import { Environment } from 'src/config';
import { RedisClientType } from 'redis';

import { userFields } from 'src/utils';

export class ServicesFactory {
	initService: InitService;
	userService: UserService;

	constructor(private env: Environment, private conn: Knex, private client: RedisClientType) {
		this.initService = new InitService();
		this.userService = new UserService({ ...this.setServiceOptions('users', userFields) });
	}

	private setServiceOptions(table: string, fields: string[]) {
		const { nodeEnv, cache, security } = this.env;
		const { enable: active, time } = cache;
		const { saltRounds: salt } = security;

		return { conn: this.conn, table, fields, client: this.client, active, nodeEnv, time, salt };
	}
}

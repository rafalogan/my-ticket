require('ts-node/register');
require('tsconfig-paths/register');

import type { knex, Knex } from 'knex';

import { env } from 'src/server';
import { KnexConfig } from 'src/config';

const { client, host, database, password, port, user } = env.database;

const config = new KnexConfig({
	client,
	connection: {
		database,
		host,
		user,
		password,
		port,
	},
	migrations: {
		extension: 'ts',
	},
	pool: {
		min: 2,
		max: 20,
	},
	useNullAsDefault: true,
}) as Knex.Config;

config.migrations = {
	...config.migrations,
	directory: './database/migrations',
};

console.log('config', config);

module.exports = config;

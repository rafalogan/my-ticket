import knex, { Knex } from 'knex';
import Config = Knex.Config;
import MigratorConfig = Knex.MigratorConfig;

import { KnexConfig } from 'src/config';
import { onError, onInfo } from 'src/core/handlers';
import { TERMINAL_COLORS } from 'src/utils';

const { greenBg, black, reset, red, cyan } = TERMINAL_COLORS;

export class DatabaseService {
	private readonly _connection: Knex;

	constructor(private knexfile: Config | KnexConfig) {
		this._connection = knex(this.knexfile as Config);
	}

	get connection() {
		return this._connection;
	}

	isConnected() {
		return this.connection
			.raw('SELECT 1+1 AS result')
			.then(result =>
				onInfo(`${greenBg + black}SUCCESS:${reset} Relational Database is Connected Active: ${result ? cyan : red}${!!result}${reset}`)
			)
			.catch((err: Error) => onError('FAIL: Relational Database is not Connected', err));
	}

	latest() {
		return this.connection.migrate
			.latest(this.knexfile as MigratorConfig)
			.then(() => onInfo('Database is updated!'))
			.catch(err => onError('Erro on updated Database.', err));
	}

	rollback() {
		return this.connection.migrate
			.rollback(this.knexfile as MigratorConfig)
			.then(() => onInfo('Database is clear.'))
			.catch(err => onError('Error on clear database.', err));
	}
}

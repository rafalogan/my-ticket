import { knexConnection, Knexfile, KnexMigrationConfig, KnexPoolConfig } from 'src/repositories/types';

export class KnexConfig {
	client: string;
	connection: string | knexConnection;
	migrations?: KnexMigrationConfig;
	pool?: KnexPoolConfig;
	useNullAsDefault?: boolean;

	constructor(props: Knexfile) {
		Object.assign(this, props);

		this.migrations = this.setMigrations(props.migrations as KnexMigrationConfig);
		this.pool = this.setPool(props.pool as KnexPoolConfig);
		this.useNullAsDefault = this.setUseNullAsDefault(props.useNullAsDefault);
	}

	private setMigrations(value?: KnexMigrationConfig) {
		const extension = value?.extension || 'ts';
		const directory = value?.directory || './database/migrations';

		return { ...value, directory, extension };
	}

	private setPool(value?: KnexPoolConfig) {
		const min = Number(value?.min || 2);
		const max = Number(value?.max || 20);

		return { ...value, min, max };
	}

	private setUseNullAsDefault(value?: boolean | string | number) {
		if (typeof value === 'string') return value === 'true';
		if (typeof value === 'number') return value !== 0;

		return value ? value : undefined;
	}
}

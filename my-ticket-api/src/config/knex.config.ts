import { knexConnection, Knexfile, KnexMigrationConfig, KnexPoolConfig } from 'src/repositories/types';

export class KnexConfig {
	client: string;
	connection: string | knexConnection;
	migrations?: KnexMigrationConfig;
	pool?: KnexPoolConfig;
	useNullAsDefault?: boolean;

	constructor(props: Knexfile) {
		Object.assign(this, props);
		this.useNullAsDefault = this.setUseNullAsDefault(props.useNullAsDefault);
	}

	setUseNullAsDefault(value?: boolean | string | number) {
		if (typeof value === 'string') return value === 'true';
		if (typeof value === 'number') return value !== 0;

		return value ? value : undefined;
	}
}

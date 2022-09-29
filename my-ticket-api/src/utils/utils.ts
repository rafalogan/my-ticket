import dotenv from 'dotenv';

import { Environment } from 'src/config';
import { Knexfile } from 'src/repositories/types';

const isValid = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

export const execDotenv = () => (isValid ? dotenv.config({ path: process.env.NODE_ENV === 'test' ? './.env.testing' : './.env' }) : null);
export const getKnexProps = (env: Environment, props?: Knexfile) => {
	const { client, host, database, password, port, user } = env.database;
	const connection = { database, host, user, password, port };
	const useNullAsDefault = props?.useNullAsDefault || true;

	return { ...props, client, connection, useNullAsDefault } as Knexfile;
};

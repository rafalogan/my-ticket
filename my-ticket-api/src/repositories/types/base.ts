import { Knex } from 'knex';
import { RedisClientType } from 'redis';

export interface BaseServiceOptions extends CacheBaseServiceOptions {
	conn: Knex;
	table: string;
	fields?: string[];
}

export interface CacheBaseServiceOptions {
	active?: boolean;
	client: RedisClientType;
	nodeEnv: string;
	time?: number;
}

export interface ReadOptions {
	id?: number;
	page?: number;
	limit?: number;
	order?: OrderOptions;
	cacheTime?: number;
	fields?: string[];
}

export interface OrderOptions {
	by: string;
	type: string;
}

export interface CustomQueryOptions extends ReadOptions {
	query: string;
}

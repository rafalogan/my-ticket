import { Knex } from 'knex';
import { RedisClientType } from 'redis';
import { messages } from 'src/utils';
import { Pagination } from '../models';

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

export interface ResultCreate {
	commad: string;
	rowCount: number;
	message: string;
}

export interface ResultUpdate {
	id: number;
	edit: boolean;
	message: string;
}

export interface ResultList<T> {
	data: Array<T>;
	pagination: Pagination;
}

export interface ReulstDelete<T> {
	id: number;
	deleted: boolean;
	message: string;
	element: T;
}

export interface List<T> {
	data: Array<T>;
	pagination: Pagination;
}

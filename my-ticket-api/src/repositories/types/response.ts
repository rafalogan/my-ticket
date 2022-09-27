import { Knex } from 'knex';
import QueryBuilder = Knex.QueryBuilder;

export interface ErrorResponseParams {
	err?: Error;
	status?: number;
	dirname?: string;
	filename?: string;
}

export interface SucessResponseParams {
	status?: number;
	message?: string;
	stack?: string;
}

export interface ResponseRegisterItem {
	create: boolean;
	data: any;
	result: QueryBuilder;
}

export interface ValidateTokenResponse {
	valid: boolean;
	status?: number;
	message?: string;
	token?: string;
}

export type IResponseExepiton = Error;

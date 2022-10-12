import bcrypt from 'bcrypt';
import { Request } from 'express';
import { CustomFile, OrderOptions, ReadOptions } from 'src/repositories/types';
import { baseUrl, storage } from 'src/utils/validate';

export const snakeToCamel = (field: string): string => {
	let toArray = field.split('_');
	toArray = toArray.map((word, index) => {
		if (index >= 1) return word.charAt(0).toUpperCase() + word.slice(1);
		return word;
	});

	return toArray.join('');
};

export const camelToSnake = (field: string): string => {
	return field
		.replace(/([A-Z])/g, ' $1')
		.split(' ')
		.join('_')
		.toLowerCase();
};

export const convertDataValues = (data: any) => {
	const keys = Object.keys(data);
	const values = Object.values(data);
	const convertKeysToSnake = keys.map(camelToSnake);
	const result: any = {};

	convertKeysToSnake.forEach((key, i) => (result[key] = values[i]));

	return result;
};

export const hashString = (field: string, salt: number) => bcrypt.hashSync(field, salt);

export const stringify = (...data: any[]) => data.map(item => item.toString()).join(' ');
export const stringifyObject = (data: any) => JSON.stringify(data);

export const convertToJson = (data: string) => JSON.parse(data);

export const clearTimestampFields = (data: any) => {
	Reflect.deleteProperty(data, 'createdAt');
	Reflect.deleteProperty(data, 'updatedAt');

	return data;
};

export const setParamsOrder = (req: Request) => {
	const value = Number(req.params.id);
	let where;
	if (req.originalUrl.includes('user')) where = 'userId';
	if (req.originalUrl.includes('place')) where = 'placeId';

	return { where, value: value };
};

export const setReadOptions = (req: Request, cacheTime?: number, fields?: string[]): ReadOptions => {
	const id = Number(req.params.id);
	const page = Number(req.query.page);
	const limit = Number(req.query.limit);
	const order: OrderOptions | undefined =
		req.query.order || req.query.orderBy ? { by: req.query.order as string, type: req.query.orderBy as string } : undefined;

	return { id, page, limit, order, cacheTime, fields };
};

export const deleteField = (data: any, field: string) => Reflect.deleteProperty(data, field);

export const setTimestampFields = (data?: Date | string | number) => (data ? new Date(data) : undefined);

export const filterRawFile = (req: Request) => {
	const file = req.file as CustomFile;
	const url = storage === 's3' ? file.location : `${baseUrl()}/media/${file.key}`;

	return {
		title: req.body.title,
		alt: req.body.alt,
		name: file.originalname,
		filename: file.key,
		type: file.mimetype,
		url,
		eventId: req.body.eventId,
		categoryId: req.body.categoryId,
		userId: req.body.userId,
	};
};

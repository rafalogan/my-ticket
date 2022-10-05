import bcrypt from 'bcrypt';
import { Request } from 'express';
import { OrderOptions, ReadOptions, Users } from 'src/repositories/types';
import { User } from 'src/repositories/entities';
import { UserModel } from 'src/repositories/models';
// import { FileEntity } from 'src/repositories/types';
// import { FileMedia } from 'src/repositories/entities';

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

export const setReadOptions = (req: Request, cacheTime?: number, fields?: string[]): ReadOptions => {
	const id = Number(req.params.id);
	const page = Number(req.query.page);
	const limit = Number(req.query.limit);
	const order: OrderOptions = { by: req.query.order as string, type: req.query.orderBy as string };

	return { id, page, limit, order, cacheTime, fields };
};

export const setFieldToDate = (field?: string | Date | number) => (field ? new Date(field) : undefined);

export const deleteField = (data: any, field: string) => Reflect.deleteProperty(data, field);

export const setTimestampFields = (data?: Date | string | number) => (data ? new Date(data) : undefined);

// export const setFilesMeda = (data?: FileEntity[] | FileMedia[]) => {
// 	return  data ? data.map(file => (file instanceof FileMedia ? file : new FileMedia(file))) : [];
// }

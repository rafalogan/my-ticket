import bcrypt from 'bcrypt';
import { Request } from 'express';
import {
	CustomFile,
	ICategoryModel,
	IPayCard,
	IPayment,
	IPayPortador,
	OrderOptions,
	ReadOptions,
	UpdatePasswordOptions,
} from 'src/repositories/types';
import { baseUrl, storage } from 'src/utils/validate';
import { Payment } from 'src/repositories/entities';

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

	return {
		title: req.body.title,
		alt: req.body.alt,
		name: req.file?.originalname || req.body.videoId,
		filename: process.env.STORAGE_TYPE === 's3' ? file.key : req.file?.filename || req.body.videoId,
		type: req.file?.mimetype || req.body.type,
		url: setUrlToFile(req, file),
		location: req.body.location,
		eventId: req.body.eventId,
		categoryId: req.body.categoryId,
		userId: req.body.userId,
	};
};

const setUrlToFile = (req: Request, file: CustomFile): string => {
	if (req.body.videoId) return `https://www.youtube.com/watch?v=${req.body.videoId}`;
	return process.env.STORAGE_TYPE === 's3' ? file.location : `${baseUrl()}/media/${req.file?.filename}`;
};

export const filterCategoryModelInterface = (value: any): ICategoryModel => ({
	id: Number(value.id),
	name: value.name,
	description: value.description,
	url: value.url,
	active: value.active,
	parentId: Number(value.parentId || value.parentid) || undefined,
	userId: Number(value.userId || value.userid) || undefined,
});

export const filterUpdatePasswordOptions = (value: any): UpdatePasswordOptions => ({
	email: value.email,
	oldPassword: value.oldPassword,
	password: value.password,
	confirmPassword: value.confirmPassword,
});

export const setCard = (data: IPayment | Payment): IPayCard => ({
	numero: data.numero,
	expiracao: data.expiracao,
	codigoSeguranca: data.codigoSeguranca,
	portador: setPortador(data),
});

const setPortador = (data: IPayment | Payment): IPayPortador => ({
	nome: data.nome,
	cpf: data.cpf,
});

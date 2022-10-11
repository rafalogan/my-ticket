import { IID } from './shared';
import { S3 } from 'aws-sdk';
import { FileEntity } from 'src/repositories/entities';
import { StorageEngine } from 'multer';
import { Client as __Client } from '@aws-sdk/smithy-client/dist-types/client';
import { HttpHandlerOptions as __HttpHandlerOptions } from '@aws-sdk/types/dist-types/http';
import { S3ClientConfig, S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from '@aws-sdk/client-s3/dist-types/S3Client';

export interface IFile extends File, IID {
	title?: string;
	alt?: string;
	name: string;
	type: string;
	url: string;
	eventId?: number;
	categoryId?: number;
}

export interface FileEntityOptions {
	id?: number;
	userId?: number;
	file?: any;
	baseUrl?: string;
}

export interface CustomFile extends Express.Multer.File {
	key: string;
}

export interface FilesFiledsTypes<T> {
	images?: Array<T>;
	videos?: Array<T>;
	audios?: Array<T>;
	texts?: Array<T>;
	files?: Array<T>;
}

interface Options {
	s3: S3;
	bucket: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, bucket?: string) => void) => void) | string;
	key?(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void): void;
	acl?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, acl?: string) => void) => void) | string | undefined;
	contentType?(
		req: Express.Request,
		file: Express.Multer.File,
		callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void
	): void;
	contentDisposition?:
		| ((req: Express.Request, file: Express.Multer.File, callback: (error: any, contentDisposition?: string) => void) => void)
		| string
		| undefined;
	metadata?(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void;
	cacheControl?:
		| ((req: Express.Request, file: Express.Multer.File, callback: (error: any, cacheControl?: string) => void) => void)
		| string
		| undefined;
	serverSideEncryption?:
		| ((req: Express.Request, file: Express.Multer.File, callback: (error: any, serverSideEncryption?: string) => void) => void)
		| string
		| undefined;
}

export interface S3Storage {
	(options?: Options): StorageEngine;

	AUTO_CONTENT_TYPE(
		req: Express.Request,
		file: Express.Multer.File,
		callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void
	): void;
	DEFAULT_CONTENT_TYPE(req: Express.Request, file: Express.Multer.File, callback: (error: any, mime?: string) => void): void;
}

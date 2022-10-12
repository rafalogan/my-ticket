import { S3 } from 'aws-sdk';
import { unlink } from 'fs/promises';
import { resolve } from 'path';

import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IFile, List, ReadOptions } from 'src/repositories/types';
import { DatabaseException, existsOrError, messages, responseDataBaseCreate, responseDataBaseUpdate, storage } from 'src/utils';
import { FileEntity } from 'src/repositories/entities';

export class FileService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	validate(data: IFile) {
		existsOrError(data.name, messages.requires('Nome'));
		existsOrError(data.type, messages.requires('Tipo'));
		existsOrError(data.url, messages.requires('Url'));
	}

	create(item: FileEntity) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: any) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAll(options?: ReadOptions) {
		return super
			.findAll(options)
			.then(res => (!res || res instanceof DatabaseException ? res : this.setFiles(res)))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (!res || res.error ? res : new FileEntity(res)))
			.catch(err => err);
	}

	private setFiles(value: List<IFile>): List<FileEntity> {
		const data = value.data.map(f => new FileEntity(f));

		return { ...value, data };
	}

	delete(id: number) {
		return this.deleteFile(id)
			.then(() => super.delete(id))
			.catch(err => err);
	}

	private async deleteFile(id: number) {
		const fromDB = await this.findOneById(id);
		const s3 = new S3();

		try {
			existsOrError(fromDB, messages.notFoundRegister);
		} catch (err) {
			return err;
		}

		const file = new FileEntity(fromDB);

		return storage === 's3'
			? s3
					.deleteObject({
						Bucket: process.env.AWS_BUCKET as string,
						Key: file.filename,
					})
					.promise()
			: unlink(resolve(__dirname, '..', '..', 'tmp', 'uploads', file.filename));
	}
}

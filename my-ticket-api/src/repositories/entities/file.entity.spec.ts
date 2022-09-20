import { beforeEach, describe, vitest, it, expect } from 'vitest';
import { IFile } from '../types';
import { faker } from '@faker-js/faker';
import { FileEntity } from './file.entity';

describe('#FileEntity Entity', () => {
	let fileMock: IFile;
	beforeEach(() => {
		fileMock = {
			name: faker.animal.cat(),
			fileName: faker.system.fileName(),
			filePath: faker.system.filePath(),
			fileType: faker.system.fileType(),
			url: faker.image.cats(),
		};

		vitest.clearAllMocks().resetAllMocks();
	});

	it('Should can be to crate simple instace', () => {
		const file = new FileEntity(fileMock);

		expect(file).toBeInstanceOf(FileEntity);
		expect(file.categoryId).toBeUndefined();
		expect(file.name).toEqual(fileMock.name);
	});

	it('Should can be to create a complete instance of a file entity', () => {
		const customFileMock = { ...fileMock, categoryId: faker.datatype.number(1), eventId: faker.datatype.number(11) };
		const id = faker.datatype.number(111);
		const file = new FileEntity(customFileMock, id);

		expect(file.id).toBeDefined();
		expect(file.id).toBeTypeOf('number');
		expect(file.categoryId).toEqual(customFileMock.categoryId);
		expect(file.eventId).toEqual(customFileMock.eventId);
	});
});

import { beforeEach, describe, expect, it } from 'vitest';
import { ICategory } from '../types';
import { faker } from '@faker-js/faker';
import { Category } from './category.entity';

describe('#Category entity', () => {
	let categoryMock: ICategory;
	beforeEach(() => {
		categoryMock = {
			name: faker.datatype.string(),
			description: faker.lorem.paragraph(1000),
			url: faker.internet.url(),
		};
	});

	it('Should be to create a Category instance', () => {
		const category = new Category(categoryMock);

		expect(category).toBeInstanceOf(Category);
		expect(category.id).toBeUndefined();
		expect(category.patentId).toBeUndefined();
	});

	it('Should be to create a category instance with id and patentId', () => {
		const subCategory = { ...categoryMock, patentId: 1 };
		const category = new Category(subCategory, 3);

		expect(category.id).toBeDefined();
		expect(category.patentId).toEqual(subCategory.patentId);
		expect(category.id).toEqual(3);
	});

	it('Should be to create a category instance with id on data', () => {
		const customCategory = { ...categoryMock, id: 2 };
		const category = new Category(customCategory);

		expect(category.id).toBeDefined();
		expect(category.id).toEqual(customCategory.id);
	});
});

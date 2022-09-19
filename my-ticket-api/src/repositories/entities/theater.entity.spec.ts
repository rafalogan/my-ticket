import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { ITheater } from '../types';
import { Theater } from './theater.entity';

describe('#Theater Entity', () => {
	let mockTheater: ITheater;
	beforeEach(() => {
		mockTheater = {
			placeId: 20,
			name: faker.datatype.string(45),
		};

		vitest.clearAllMocks().resetAllMocks();
	});

	it('Should be able to create a instance of Theater', () => {
		const theater = new Theater(mockTheater);

		expect(theater).toBeInstanceOf(Theater);
		expect(theater.id).toBeUndefined();
		expect(theater.name).toEqual(mockTheater.name);
	});

	it('Should be able to create a instance of Theater with an id', () => {
		const id = 50;
		const theater = new Theater(mockTheater, id);

		expect(theater.id).toBeDefined();
		expect(theater.id).toBeTypeOf('number');
		expect(theater.id).toEqual(Number(id));
	});

	it('Should be able to create a complete instance of Theater', () => {
		const customMockTheater = { ...mockTheater };
		customMockTheater.id = 1000;
		customMockTheater.description = faker.lorem.sentence();

		const theater = new Theater(customMockTheater);

		expect(theater.description).toBeDefined();
		expect(theater.description).toBeTypeOf('string');
		expect(theater.description).toEqual(customMockTheater.description);
	});
});

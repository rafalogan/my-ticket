import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { ICapacity } from '../types';
import { Capacity } from './capacity.entity';
import { getRandom } from '../../../test/utils';

describe('#Capacity Entity', () => {
	let mockCapacity: ICapacity;
	beforeEach(() => {
		mockCapacity = {
			theaterId: getRandom(),
			section: faker.datatype.string(100),
			row: faker.datatype.string(10),
			places: getRandom(),
		};

		vitest.resetAllMocks().clearAllMocks();
	});

	it('Should be able to create instance of the Capacity entity', () => {
		const capacity = new Capacity(mockCapacity);

		expect(capacity).toBeInstanceOf(Capacity);
		expect(capacity.id).toBeUndefined();
		expect(capacity.theaterId).toEqual(mockCapacity.theaterId);
		expect(capacity.row).toEqual(mockCapacity.row);
		expect(capacity.places).toEqual(mockCapacity.places);
	});

	it('should be able to create instance of the Capacity entity with id', () => {
		const id = getRandom(10);
		const capacity = new Capacity(mockCapacity, id);

		expect(capacity.id).toBeDefined();
		expect(capacity.id).toBeTypeOf('number');
		expect(capacity.id).toEqual(Number(id));
	});
});

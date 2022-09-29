import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { faker } from '@faker-js/faker';

import { IPlace } from '../types';
import { Place } from './place.entity';

describe('#Place Entity', () => {
	let placeMock: IPlace;
	beforeEach(() => {
		placeMock = {
			name: faker.datatype.string(45),
			addressId: faker.datatype.number(1),
			userId: faker.datatype.number(11),
		};
		vitest.resetAllMocks().clearAllMocks();
	});

	it('Should can be to create a instance of a Place', () => {
		const place = new Place(placeMock);

		expect(place).toBeInstanceOf(Place);
		expect(place.id).toBeUndefined();
		expect(place.name).toEqual(placeMock.name);
	});

	it('Should be able to create a instance of Place with id', () => {
		const id = 1;
		const place = new Place(placeMock, id);

		expect(place.id).toBeDefined();
		expect(place.id).toEqual(id);
	});
});

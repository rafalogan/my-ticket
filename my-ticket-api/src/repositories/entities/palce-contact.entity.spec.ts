import { beforeEach, describe, expect, vitest, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { IPlaceContact } from '../types';
import { PlaceContact } from './palce-contact.entity';

describe('#PlaceContact Entity', () => {
	let mockContact: IPlaceContact;
	beforeEach(() => {
		mockContact = {
			placeId: 100,
			type: faker.datatype.string(45),
			value: faker.phone.number(),
		};

		vitest.resetAllMocks().clearAllMocks();
	});

	it('Should be able to create a new PlaceContact', () => {
		const contact = new PlaceContact(mockContact);

		expect(contact).toBeInstanceOf(PlaceContact);
		expect(contact.id).toBeUndefined();
		expect(contact.placeId).toEqual(mockContact.placeId);
	});

	it('Should be able to create a new PlaceContact with an id', () => {
		const id = 5;
		const contact = new PlaceContact(mockContact, id);

		expect(contact.id).toBeDefined();
		expect(contact.id).toEqual(Number(id));
		expect(contact.id).toBeTypeOf('number');
	});
});

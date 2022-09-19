import { beforeEach, describe, it, vitest } from 'vitest';
import { faker } from '@faker-js/faker';

import { IAdress } from '../types';

describe('#Adress Entity', () => {
	let adressMock: IAdress;
	beforeEach(() => {
		faker.locale = 'pt_BR';
		adressMock = {
			cep: faker.address.zipCode(),
			street: faker.address.streetAddress(),
			district: faker.address.street(),
			city: faker.address.city(),
			state: faker.address.stateAbbr(),
		};

		console.log('mockAdress', adressMock);
		vitest.clearAllMocks().resetAllMocks();
	});

	it('Should be able to create a new Adress instace', () => {});
});

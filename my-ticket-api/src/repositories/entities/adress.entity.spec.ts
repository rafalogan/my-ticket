import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { faker } from '@faker-js/faker';

import { IAdress } from '../types';
import { Adress } from './address.entity';

describe('#Adress Entity', () => {
	let adressMock: IAdress;
	beforeEach(() => {
		faker.locale = 'pt_BR';
		adressMock = {
			cep: faker.address.zipCode(),
			street: faker.address.streetAddress(),
			district: faker.address.street(),
			city: faker.address.cityName(),
			state: faker.address.stateAbbr(),
		};

		vitest.clearAllMocks().resetAllMocks();
	});

	it('Should be able to create a new Adress instace', () => {
		const adress = new Adress(adressMock);

		expect(adress).toBeInstanceOf(Adress);
		expect(adress.id).toBeUndefined();
		expect(adress.cep).toBeDefined();
		expect(adress.street).toEqual(adressMock.street);
	});

	it('Should be able to Create a new Adress with an id', () => {
		const id = 10;
		const adress = new Adress(adressMock, id);

		expect(adress.id).toBeDefined();
		expect(adress.id).toBeTypeOf('number');
		expect(adress.id).toEqual(id);
	});

	it('Should be able to Create a new Adress with a complete data', () => {
		const customAdressMock = { ...adressMock };
		customAdressMock.id = 11;
		customAdressMock.number = `${faker.address.buildingNumber()}`;
		customAdressMock.complement = faker.address.secondaryAddress();
		customAdressMock.urlMaps = faker.image.city();

		const adress = new Adress(customAdressMock);

		expect(adress.id).toBeDefined();
		expect(adress.number).toEqual(customAdressMock.number);
		expect(adress.complement).toBeTypeOf('string');
		expect(adress.urlMaps).toEqual(customAdressMock.urlMaps);
	});
});

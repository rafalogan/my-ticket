import { describe, test, expect, beforeEach } from 'vitest';
import { IUser } from '../types';
import { User } from './user.entity';
import { faker } from '@faker-js/faker';

describe('#User entity', () => {
	let mockUser: IUser;
	beforeEach(() => {
		mockUser = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			cpf: `${faker.datatype.number({ min: 10000000000 })}`,
			email: faker.internet.email(),
			profileId: faker.datatype.number(),
		};
	});

	test('Create instace of User', () => {
		const user = new User(mockUser);

		expect(user).toBeInstanceOf(User);
		expect(user.id).toBeUndefined();
		expect(user.firstName).toEqual(mockUser.firstName);
	});

	test('Should be created instance with id', () => {
		const user = new User(mockUser, 5);

		expect(user.id).toBeDefined();
		expect(user.id).toEqual(5);
	});
});

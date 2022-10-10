import { beforeEach, describe, it, expect } from 'vitest';
import { IProfile } from '../types';
import { Profile } from './profile.entity';
import { faker } from '@faker-js/faker';

describe('#Profile', () => {
	let data: IProfile;
	beforeEach(() => {
		data = {
			name: faker.name.fullName(),
			description: faker.lorem.paragraph(1000),
			active: true,
		};
	});

	it('Should be created new instace', () => {
		const profile = new Profile(data);

		expect(profile).toBeInstanceOf(Profile);
		expect(profile.id).toBeUndefined();
		expect(profile.name).toBeDefined();
		expect(profile.name).toEqual(data.name);
		expect(profile.description).toBeDefined();
		expect(profile.active).toEqual(true);
	});

	it('Should be created new instace of profile  with id', () => {
		const profile = new Profile(data, 10);

		expect(profile.id).toBeDefined();
		expect(profile.id).toEqual(10);
	});
});

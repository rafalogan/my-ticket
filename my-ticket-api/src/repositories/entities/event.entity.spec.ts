import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { IEvent } from '../types';
import { faker } from '@faker-js/faker';
import { EventEntity } from './event.entity';

describe('#Event Entity', () => {
	let eventMock: IEvent;
	beforeEach(() => {
		eventMock = {
			categoryId: faker.datatype.number(1),
			title: faker.datatype.string(45),
			content: faker.lorem.paragraph(),
			type: faker.datatype.string(),
			userId: faker.datatype.number(1),
		};

		vitest.resetAllMocks();
		vitest.clearAllMocks();
	});

	it('Should be to create a basic instance', () => {
		const event = new EventEntity(eventMock);

		expect(event).toBeInstanceOf(EventEntity);
		expect(event.id).toBeUndefined();
		expect(event.subTitle).toBeUndefined();
		expect(event.content).toEqual(eventMock.content);
	});

	it('Should to be created a complete instcee', () => {
		const customEventData = { ...eventMock, subTitle: faker.datatype.string(50) };
		const id = faker.datatype.number({ min: 10 });
		const event = new EventEntity(customEventData, id);

		expect(event.id).toBeDefined();
		expect(event.id).toEqual(id);
		expect(event.subTitle).toEqual(customEventData.subTitle);
	});
});

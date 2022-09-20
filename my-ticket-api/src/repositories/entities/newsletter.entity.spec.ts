import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { INewsletter } from '../types';
import { Newsletter } from './newsletter.entity';
import { getRandom } from '../../../test/utils';

describe('#Newsletter Entity', () => {
  let mocckNewsletter: INewsletter;
  beforeEach(() => {
    mocckNewsletter = {
      email: faker.internet.email(),
      active: true,
    };
    vitest.clearAllMocks().resetAllMocks();
  });

  it('Should be able to create a new Newsletter', () => {
    const newsletter = new Newsletter(mocckNewsletter);

    expect(newsletter).toBeInstanceOf(Newsletter);
    expect(newsletter.id).toBeUndefined();
    expect(newsletter.email).toEqual(mocckNewsletter.email);
    expect(newsletter.active).toBeTruthy();
  });

  it('Should be able to create a new Newsletter with id', () => {
    const id = getRandom(1);
    const newsletter = new Newsletter(mocckNewsletter, id);

    expect(newsletter.id).toBeDefined();
    expect(newsletter.id).toEqual(Number(id));
  });
  it('Should be able to create a complete instance of Newsletter', () => {
    const customMockNewsletter = { ...mocckNewsletter };
    customMockNewsletter.id = getRandom(1);
    customMockNewsletter.name = faker.name.fullName();

    const newsletter = new Newsletter(customMockNewsletter);

    expect(newsletter.id).toBeDefined();
    expect(newsletter.id).toBeTypeOf('number');
    expect(newsletter.name).toEqual(customMockNewsletter.name);
  });
});

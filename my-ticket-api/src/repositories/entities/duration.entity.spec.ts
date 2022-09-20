import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { IDuration } from '../types';
import { getRandom } from '../../../test/utils';
import { Duration } from './duration.entity';

describe('#Duration Entity', () => {
  let mockDuration: IDuration;
  beforeEach(() => {
    mockDuration = {
      startDate: faker.datatype.datetime(),
      endDate: faker.datatype.datetime(),
      theaterId: getRandom(),
    };

    vitest.clearAllMocks().resetAllMocks();
  });

  it('Should be able to create instance of Duration', () => {
    const duration = new Duration(mockDuration);

    expect(duration).toBeInstanceOf(Duration);
    expect(duration.id).toBeUndefined();
    expect(duration.startDate).toBeDefined();
    expect(duration.startDate).toBeInstanceOf(Date);
    expect(duration.endDate).toBeInstanceOf(Date);
    expect(duration.endDate).toBeDefined();
    expect(duration.theaterId).toBeDefined();
  });

  it('Should be able to create instance of Duration with id', () => {
    const id = getRandom(1);
    const duration = new Duration(mockDuration, id);

    expect(duration.id).toBeDefined();
    expect(duration.id).toEqual(Number(id));
    expect(duration.id).toBeTypeOf('number');
  });
});

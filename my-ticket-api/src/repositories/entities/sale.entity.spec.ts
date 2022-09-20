import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { ISale } from '../types';
import { getRandom } from '../../../test/utils';
import { Sale } from './sale.entity';

describe('#Sale Entity', () => {
  let mockSale: ISale;
  beforeEach(() => {
    mockSale = {
      ticketId: getRandom(1),
      userId: getRandom(1),
      palce: faker.datatype.string(5),
    };

    vitest.clearAllMocks().resetAllMocks();
  });

  it('Should be able to create an instance of Sale', () => {
    const sale = new Sale(mockSale);

    expect(sale).toBeInstanceOf(Sale);
    expect(sale.id).toBeUndefined();
    expect(sale.ticketId).toBeTypeOf('number');
    expect(sale.userId).toEqual(Number(mockSale.userId));
    expect(sale.palce).toBeDefined();
  });

  it('Should be able to create an instance of Sale with id', () => {
    const id = getRandom(100);
    const sale = new Sale(mockSale, id);

    expect(sale.id).toBeDefined();
    expect(sale.id).toEqual(Number(id));
    expect(sale.id).toBeTypeOf('number');
  });
});

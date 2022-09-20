import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { ITicket } from '../types';
import { getRandom } from '../../../test/utils';
import { Ticket } from './ticket.entity';

describe('#Ticket Enumeration', () => {
  let mockTicket: ITicket;
  beforeEach(() => {
    mockTicket = {
      eventId: getRandom(1),
      placeId: getRandom(1),
      theaterId: getRandom(1),
      durationId: getRandom(),
      amount: getRandom(100),
      unitaryValue: getRandom(),
    };
    vitest.clearAllMocks().resetAllMocks();
  });

  it('Should be able to creat new tickets', () => {
    const ticket = new Ticket(mockTicket);

    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.id).toBeUndefined();
    expect(ticket.eventId).toEqual(mockTicket.eventId);
    expect(ticket.placeId).toEqual(mockTicket.placeId);
    expect(ticket.theaterId).toEqual(mockTicket.theaterId);
    expect(ticket.durationId).toEqual(mockTicket.durationId);
    expect(ticket.amount).toEqual(mockTicket.amount);
    expect(ticket.unitaryValue).toBeTypeOf('number');
  });

  it('Should be able to create a new ticket with id', () => {
    const id = getRandom(1);
    const ticket = new Ticket(mockTicket, id);

    expect(ticket.id).toBeDefined();
    expect(ticket.id).toBeTypeOf('number');
    expect(ticket.id).toEqual(Number(id));
  });
});

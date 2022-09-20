import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { IContact } from '../types';
import { Contact } from './contact.entity';
import { getRandom } from '../../../test/utils';

describe('#Contact Entity', () => {
  let mockContact: IContact;
  beforeEach(() => {
    mockContact = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      subject: faker.datatype.string(100),
      message: faker.lorem.paragraph(5),
    };

    vitest.clearAllMocks().clearAllMocks();
  });

  it('Should be able to create a new contact', () => {
    const contact = new Contact(mockContact);

    expect(contact).toBeInstanceOf(Contact);
    expect(contact.id).toBeUndefined();
    expect(contact.name).toEqual(mockContact.name);
    expect(contact.email).toEqual(mockContact.email);
    expect(contact.subject).toBeDefined();
    expect(contact.message).toBeTypeOf('string');
  });

  it('Should be able to create an instance of Contact with separate id', () => {
    const id = getRandom(1);
    const contact = new Contact(mockContact, id);

    expect(contact.id).toBeDefined();
    expect(contact.id).toBeTypeOf('number');
    expect(contact.id).toEqual(Number(id));
  });

  it('Should be able to create a complete instance of Contact', () => {
    const customMockContact = { ...mockContact };
    customMockContact.id = getRandom(1);
    customMockContact.phone = faker.phone.number();
    customMockContact.saleId = getRandom(10);

    const contact = new Contact(customMockContact);

    expect(contact.id).toEqual(Number(customMockContact.id));
    expect(contact.phone).toBeDefined();
    expect(contact.saleId).toBeTypeOf('number');
  });
});

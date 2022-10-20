import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IContact, ReadContactOptions, ReadOptions } from 'src/repositories/types';
import { DatabaseException, existsOrError, messages, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';
import { Contact } from 'src/repositories/entities';

export class ContactService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	validate(data: IContact) {
		existsOrError(data.name, messages.requires('Nome'));
		existsOrError(data.email, messages.requires('E-mail'));
		existsOrError(data.subject, messages.requires('Subject'));
		existsOrError(data.message, messages.requires('Mensagem'));
	}

	create(item: Contact) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	findAll(options?: ReadContactOptions) {
		return super
			.findAllByWhere('saleId', Number(options?.saleId), options)
			.then(res => this.setAllContacts(res))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(this.setContact)
			.catch(err => err);
	}

	private setAllContacts(value?: any) {
		if (!value) return [];
		if (value.severity === 'ERROR') return new DatabaseException(value.detail || value.hint || messages.notFoundRegister, value);

		return value.map((i: IContact) => new Contact(i));
	}

	private setContact(value: any) {
		if (!value || value instanceof DatabaseException) return value;
		return new Contact(value);
	}
}

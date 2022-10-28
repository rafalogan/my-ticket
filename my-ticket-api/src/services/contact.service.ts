import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IContact, IContactToSale, ReadContactOptions, ReadOptions } from 'src/repositories/types';
import { DatabaseException, existsOrError, messages, responseDataBaseCreate, verifyData } from 'src/utils';
import { Contact, Sale, User } from 'src/repositories/entities';
import { MailService } from './mail.service';
import { onLog } from 'src/core/handlers';

export class ContactService extends BaseService {
	constructor(options: BaseServiceOptions, private mailService: MailService) {
		super(options);
	}

	validate(data: IContact) {
		existsOrError(data.name, messages.requires('Nome'));
		existsOrError(data.email, messages.requires('E-mail'));
		existsOrError(data.subject, messages.requires('Subject'));
		existsOrError(data.message, messages.requires('Mensagem'));
	}

	async create(item: Contact) {
		const send = item.saleId ? await this.sendEmailWhenSaleId(item) : this.sendMailDefault(item);

		onLog('send response', send);

		try {
			verifyData(send);
		} catch (err) {
			return err;
		}

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

	sendMailDefault(data: Contact) {
		return this.mailService.send({
			to: process.env.EMAIL_DEFAULT,
			subject: data.subject,
			message: messages.mailTemplate(data),
		});
	}

	async sendEmailWhenSaleId(data: Contact) {
		return this.findSaleOfContact(Number(data.saleId))
			.then(res =>
				res instanceof DatabaseException
					? res
					: this.mailService.send({
							to: res.email,
							from: data.email,
							subject: data.subject,
							message: messages.mailTemplate(data),
					  })
			)
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

	private findSaleOfContact(id: number) {
		onLog('id', id);

		return this.conn({ s: 'sales', t: 'tickets', u: 'users' })
			.select({ saleId: 's.id' }, { userId: 't.user_id' }, { email: 'u.email' })
			.whereRaw('s.id = ?', id)
			.andWhereRaw('t.id = s.ticket_id')
			.andWhereRaw('u.id = s.user_id')
			.first()
			.then(res => this.setData(res))
			.catch(err => err);
	}

	private setData(data: any) {
		onLog('response data', data);
		if (!data) return {};
		if (data.severity === 'ERROR') return new DatabaseException(data.detail || data.hint || messages.notFoundRegister, data);

		data.email = data.email === 'root@root.com' && process.env.NODE_ENV !== 'production' ? process.env.EMAIL_DEFAULT : data.email;
		return data as IContactToSale;
	}
}

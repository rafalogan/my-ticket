import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IContact, ReadContactOptions, ReadOptions } from 'src/repositories/types';
import {
	DatabaseException,
	existsOrError,
	messages,
	responseDataBaseCreate,
	saleFields,
	ticketFields,
	userFields,
	verifyData,
} from 'src/utils';
import { Contact, Sale, User } from 'src/repositories/entities';
import { MailService } from './mail.service';
import { TicketService } from 'src/services/ticket.service';

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
		const sale = await this.findSaleOfContact(Number(data.saleId));

		try {
			verifyData(sale);
		} catch (err) {
			return err;
		}

		const ticket = await this.findTicketOfSale(sale.ticketId);

		try {
			verifyData(ticket);
		} catch (err) {
			return err;
		}

		const user = await this.findUserOfTicket(ticket.userId);

		try {
			verifyData(user);
		} catch (err) {
			return err;
		}

		return this.mailService.send({
			to: user.email,
			subject: data.subject,
			message: messages.mailTemplate(data),
		});
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
		return this.conn('sales')
			.select(...saleFields)
			.where({ id })
			.first()
			.then(res => this.setData(res, 'sale'))
			.catch(err => err);
	}

	private findTicketOfSale(id: number) {
		return this.conn('tickets')
			.select(...ticketFields)
			.where({ id })
			.first()
			.then(res => this.setData(res, 'ticket'))
			.catch(err => err);
	}

	private findUserOfTicket(id: number) {
		return this.conn('users')
			.select(...userFields)
			.where({ id })
			.first()
			.then(res => this.setData(res, 'user'))
			.catch(err => err);
	}

	private setData(data: any, to: string) {
		if (!data) return {};
		if (data.severity === 'ERROR') return new DatabaseException(data.detail || data.hint || messages.notFoundRegister, data);

		return to === 'sale' ? new Sale(data) : to === 'ticket' ? new TicketService(data) : new User(data);
	}
}

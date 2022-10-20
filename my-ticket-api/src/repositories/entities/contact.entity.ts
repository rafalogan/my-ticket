import { IContact } from '../types/contact';

export class Contact {
	id?: number;
	name: string;
	email: string;
	subject: string;
	phone?: string;
	message: string;
	saleId?: number;

	constructor(data: IContact, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.name = data.name;
		this.email = data.email;
		this.subject = data.subject;
		this.phone = data.phone;
		this.message = data.message;
		this.saleId = Number(data.saleId) || undefined;
	}
}

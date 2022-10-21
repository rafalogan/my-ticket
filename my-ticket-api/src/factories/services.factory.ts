import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import {
	AuthService,
	CategoryService,
	ContactService,
	DurationService,
	EventService,
	FileService,
	InitService,
	MailService,
	NewsletterService,
	PaymentService,
	PayService,
	PhoneService,
	PlaceService,
	ProfileService,
	SaleService,
	TheaterService,
	TicketService,
	UserService,
} from 'src/services';
import { Environment, MailerConfig } from 'src/config';
import {
	categoryFields,
	contactFields,
	durationFields,
	eventFields,
	fileFields,
	newsletterFields,
	paymentFields,
	placeFields,
	profileFields,
	saleFields,
	theaterFields,
	ticketFields,
	userFields,
} from 'src/utils';

export class ServicesFactory {
	initService: InitService;
	userService: UserService;
	profileService: ProfileService;
	authService: AuthService;
	eventService: EventService;
	categoryService: CategoryService;
	placeService: PlaceService;
	phoneService: PhoneService;
	theaterService: TheaterService;
	durationService: DurationService;
	ticketService: TicketService;
	fileService: FileService;
	paymentService: PaymentService;
	saleService: SaleService;
	payService: PayService;
	mailService: MailService;
	contactService: ContactService;
	newsletterService: NewsletterService;

	constructor(private env: Environment, private conn: Knex, private client: RedisClientType, private mailConfig: MailerConfig) {
		this.initService = new InitService();
		this.userService = new UserService({ ...this.setServiceOptions('users', userFields) });
		this.profileService = new ProfileService({ ...this.setServiceOptions('profiles', profileFields) }, this.userService);
		this.authService = new AuthService(this.env.security.authsecret, this.userService, this.profileService);
		this.eventService = new EventService(this.setServiceOptions('events', eventFields));
		this.categoryService = new CategoryService(this.setServiceOptions('categories', categoryFields));
		this.placeService = new PlaceService(this.setServiceOptions('places', placeFields));
		this.theaterService = new TheaterService(this.setServiceOptions('theaters', theaterFields));
		this.durationService = new DurationService(this.setServiceOptions('durations', durationFields));
		this.ticketService = new TicketService(this.setServiceOptions('tickets', ticketFields));
		this.fileService = new FileService(this.setServiceOptions('files', fileFields));
		this.paymentService = new PaymentService(this.setServiceOptions('payment_methods', paymentFields));
		this.payService = new PayService();
		this.mailService = new MailService(this.mailConfig);
		this.saleService = new SaleService(
			this.setServiceOptions('sales', saleFields),
			this.payService,
			this.ticketService,
			this.paymentService
		);
		this.contactService = new ContactService(this.setServiceOptions('contacts', contactFields), this.mailService);
		this.newsletterService = new NewsletterService(this.setServiceOptions('newsletter', newsletterFields));
	}

	private setServiceOptions(table: string, fields: string[]) {
		const { nodeEnv, cache, security } = this.env;
		const { enable: active, time } = cache;
		const { saltRounds: salt } = security;

		return { conn: this.conn, table, fields, client: this.client, active, nodeEnv, time, salt };
	}
}

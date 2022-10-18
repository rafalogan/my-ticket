import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import {
	AuthService,
	CategoryService,
	DurationService,
	EventService,
	FileService,
	InitService,
	PayService,
	PhoneService,
	PlaceService,
	ProfileService,
	SaleService,
	TheaterService,
	TicketService,
	UserService,
} from 'src/services';
import { Environment } from 'src/config';
import {
	categoryFields,
	durationFields,
	eventFields,
	fileFields,
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
	saleService: SaleService;
	payService: PayService;

	constructor(private env: Environment, private conn: Knex, private client: RedisClientType) {
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
		this.payService = new PayService();
		this.saleService = new SaleService(this.setServiceOptions('sales', saleFields), this.payService, this.ticketService);
	}

	private setServiceOptions(table: string, fields: string[]) {
		const { nodeEnv, cache, security } = this.env;
		const { enable: active, time } = cache;
		const { saltRounds: salt } = security;

		return { conn: this.conn, table, fields, client: this.client, active, nodeEnv, time, salt };
	}
}

import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import {
	AddressService,
	AuthService,
	CategoryService,
	DurationService,
	EventService,
	FileService,
	InitService,
	PhoneService,
	PlaceService,
	ProfileService,
	SaleService,
	SeatAddressService,
	TheaterService,
	TicketService,
	UserService,
} from 'src/services';
import { Environment } from 'src/config';
import {
	addressFields,
	categoryFields,
	durationFields,
	eventFields,
	fileFields,
	phoneFields,
	placeFields,
	profileFields,
	saleFields,
	seatAddressFields,
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
	addressService: AddressService;
	phoneService: PhoneService;
	theaterService: TheaterService;
	seatAddressService: SeatAddressService;
	durationService: DurationService;
	ticketService: TicketService;
	fileService: FileService;
	saleService: SaleService;

	constructor(private env: Environment, private conn: Knex, private client: RedisClientType) {
		this.initService = new InitService();
		this.userService = new UserService({ ...this.setServiceOptions('users', userFields) });
		this.profileService = new ProfileService({ ...this.setServiceOptions('profiles', profileFields) }, this.userService);
		this.authService = new AuthService(this.env.security.authsecret, this.userService, this.profileService);
		this.eventService = new EventService(this.setServiceOptions('events', eventFields));
		this.categoryService = new CategoryService(this.setServiceOptions('categories', categoryFields));
		this.placeService = new PlaceService(this.setServiceOptions('places', placeFields));
		this.addressService = new AddressService(this.setServiceOptions('address', addressFields));
		this.phoneService = new PhoneService(this.setServiceOptions('phones', phoneFields));
		this.theaterService = new TheaterService(this.setServiceOptions('theaters', theaterFields));
		this.seatAddressService = new SeatAddressService(this.setServiceOptions('seat_address', seatAddressFields));
		this.durationService = new DurationService(this.setServiceOptions('durations', durationFields));
		this.ticketService = new TicketService(this.setServiceOptions('tickets', ticketFields));
		this.fileService = new FileService(this.setServiceOptions('files', fileFields));
		this.saleService = new SaleService(this.setServiceOptions('sales', saleFields));
	}

	private setServiceOptions(table: string, fields: string[]) {
		const { nodeEnv, cache, security } = this.env;
		const { enable: active, time } = cache;
		const { saltRounds: salt } = security;

		return { conn: this.conn, table, fields, client: this.client, active, nodeEnv, time, salt };
	}
}

import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import {
	AddressService,
	AuthService,
	CapacityService,
	CategoryService,
	DurationService,
	EventService,
	FileService,
	InitService,
	PhoneService,
	PlaceService,
	ProfileService,
	TheaterService,
	TicketService,
	UserService,
} from 'src/services';
import { Environment } from 'src/config';
import {
	addressFields,
	capacityFields,
	categoryFields,
	durationFields,
	eventFields,
	fileFields,
	phoneFields,
	placeFields,
	profileFields,
	theaterFields,
	ticketFields,
	userFields,
} from 'src/utils';

export class ServicesFactory {
	initService: InitService;
	userService: UserService;
	profileService: ProfileService;
	authService: AuthService;
	categoryService: CategoryService;
	eventService: EventService;
	placeService: PlaceService;
	addressService: AddressService;
	phoneService: PhoneService;
	theaterService: TheaterService;
	capacityService: CapacityService;
	durationService: DurationService;
	ticketService: TicketService;
	fileService: FileService;

	constructor(private env: Environment, private conn: Knex, private client: RedisClientType) {
		this.initService = new InitService();
		this.userService = new UserService({ ...this.setServiceOptions('users', userFields) });
		this.profileService = new ProfileService({ ...this.setServiceOptions('profiles', profileFields) }, this.userService);
		this.authService = new AuthService(this.env.security.authsecret, this.userService, this.profileService);
		this.categoryService = new CategoryService(this.setServiceOptions('categories', categoryFields));
		this.eventService = new EventService(this.setServiceOptions('events', eventFields));
		this.placeService = new PlaceService(this.setServiceOptions('places', placeFields));
		this.addressService = new AddressService(this.setServiceOptions('address', addressFields));
		this.phoneService = new PhoneService(this.setServiceOptions('phones', phoneFields));
		this.theaterService = new TheaterService(this.setServiceOptions('theaters', theaterFields));
		this.capacityService = new CapacityService(this.setServiceOptions('capacity', capacityFields));
		this.durationService = new DurationService(this.setServiceOptions('durations', durationFields));
		this.ticketService = new TicketService(this.setServiceOptions('tickets', ticketFields));
		this.fileService = new FileService(this.setServiceOptions('files', fileFields));
	}

	private setServiceOptions(table: string, fields: string[]) {
		const { nodeEnv, cache, security } = this.env;
		const { enable: active, time } = cache;
		const { saltRounds: salt } = security;

		return { conn: this.conn, table, fields, client: this.client, active, nodeEnv, time, salt };
	}
}

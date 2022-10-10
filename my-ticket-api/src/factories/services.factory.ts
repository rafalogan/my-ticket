import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import {
	AddressService,
	AuthService,
	CategoryService,
	EventService,
	InitService,
	PhoneService,
	PlaceService,
	ProfileService,
	TheaterService,
	UserService,
} from 'src/services';
import { Environment } from 'src/config';
import { addressFields, categoryFields, eventFields, phoneFields, placeFields, profileFields, theaterFields, userFields } from 'src/utils';

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
	}

	private setServiceOptions(table: string, fields: string[]) {
		const { nodeEnv, cache, security } = this.env;
		const { enable: active, time } = cache;
		const { saltRounds: salt } = security;

		return { conn: this.conn, table, fields, client: this.client, active, nodeEnv, time, salt };
	}
}

import { Application } from 'express';
import { ServicesFactory } from 'src/factories/services.factory';
import { AuthModule } from 'src/modules/auth';
import { UserModule } from 'src/modules/user';
import { RouteOptions } from 'src/repositories/types';
import { notfoundRoute } from 'src/core/routes/notfound.route';
import { AuthConfig } from 'src/config';
import { ProfileModule } from 'src/modules/profile';
import { CategoryModule } from 'src/modules/categoey';
import { EventModule } from 'src/modules/event';
import { PlaceModule } from 'src/modules/place';
import { AddressModule } from 'src/modules/address';
import { PhoneModule } from 'src/modules/phone';
import { TheaterModule } from 'src/modules/theater';
import { CapacityModule } from 'src/modules/capacity';
import { DurationModule } from 'src/modules/duration';
import { TicketModule } from 'src/modules/ticket';

export class ModulesFactory {
	private authModule: AuthModule;
	private userModule: UserModule;
	private profileModule: ProfileModule;
	private categoryModule: CategoryModule;
	private eventModule: EventModule;
	private placeModule: PlaceModule;
	private addressModule: AddressModule;
	private phoneModule: PhoneModule;
	private theaterModule: TheaterModule;
	private capacityModule: CapacityModule;
	private durationModule: DurationModule;
	private ticketModule: TicketModule;

	constructor(private app: Application, private auth: AuthConfig, services: ServicesFactory) {
		this.authModule = new AuthModule({ service: services.authService, ...this.getRouteOptions() });
		this.userModule = new UserModule({ service: services.userService, ...this.getRouteOptions() });
		this.profileModule = new ProfileModule({ service: services.profileService, ...this.getRouteOptions() });
		this.categoryModule = new CategoryModule({ service: services.categoryService, ...this.getRouteOptions() });
		this.eventModule = new EventModule({ service: services.eventService, ...this.getRouteOptions() });
		this.placeModule = new PlaceModule({ service: services.placeService, ...this.getRouteOptions() });
		this.addressModule = new AddressModule({ service: services.addressService, ...this.getRouteOptions() });
		this.phoneModule = new PhoneModule({ service: services.phoneService, ...this.getRouteOptions() });
		this.theaterModule = new TheaterModule({ service: services.theaterService, ...this.getRouteOptions() });
		this.capacityModule = new CapacityModule({ service: services.capacityService, ...this.getRouteOptions() });
		this.durationModule = new DurationModule({ service: services.durationService, ...this.getRouteOptions() });
		this.ticketModule = new TicketModule({ service: services.ticketService, ...this.getRouteOptions() });
	}

	exec() {
		this.authModule.exec();
		this.userModule.exec();
		this.profileModule.exec();
		this.categoryModule.exec();
		this.eventModule.exec();
		this.placeModule.exec();
		this.addressModule.exec();
		this.phoneModule.exec();
		this.theaterModule.exec();
		this.capacityModule.exec();
		this.durationModule.exec();
		this.ticketModule.exec();
		this.app.use(notfoundRoute);
	}

	private getRouteOptions(): RouteOptions {
		return { app: this.app, auth: this.auth };
	}
}

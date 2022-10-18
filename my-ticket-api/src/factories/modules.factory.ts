import { resolve } from 'path';
import express, { Application } from 'express';
import { Multer } from 'multer';

import { ServicesFactory } from 'src/factories/services.factory';
import { AuthModule } from 'src/modules/auth';
import { UserModule } from 'src/modules/user';
import { AuthConfig } from 'src/config';
import { ProfileModule } from 'src/modules/profile';
import { CategoryModule } from 'src/modules/categoey';
import { EventModule } from 'src/modules/event';
import { PlaceModule } from 'src/modules/place';
import { PhoneModule } from 'src/modules/phone';
import { TheaterModule } from 'src/modules/theater';
import { DurationModule } from 'src/modules/duration';
import { TicketModule } from 'src/modules/ticket';
import { FileModule } from 'src/modules/file';
import { RouteOptions } from 'src/repositories/types';
import { notfoundRoute } from 'src/core/routes/notfound.route';
import { SaleModule } from 'src/modules/sale';
import { PaymentModule } from 'src/modules/payment';

export class ModulesFactory {
	private authModule: AuthModule;
	private userModule: UserModule;
	private profileModule: ProfileModule;
	private categoryModule: CategoryModule;
	private eventModule: EventModule;
	private placeModule: PlaceModule;
	private phoneModule: PhoneModule;
	private theaterModule: TheaterModule;
	private durationModule: DurationModule;
	private ticketModule: TicketModule;
	private fileModule: FileModule;
	private paymentModule: PaymentModule;
	private saleModule: SaleModule;

	constructor(private app: Application, private auth: AuthConfig, services: ServicesFactory, upload: Multer) {
		this.authModule = new AuthModule({ service: services.authService, ...this.getRouteOptions() });
		this.userModule = new UserModule({ service: services.userService, ...this.getRouteOptions() });
		this.profileModule = new ProfileModule({ service: services.profileService, ...this.getRouteOptions() });
		this.categoryModule = new CategoryModule({ service: services.categoryService, ...this.getRouteOptions() });
		this.eventModule = new EventModule({ service: services.eventService, ...this.getRouteOptions() });
		this.placeModule = new PlaceModule({ service: services.placeService, ...this.getRouteOptions() });
		this.phoneModule = new PhoneModule({ service: services.phoneService, ...this.getRouteOptions() });
		this.theaterModule = new TheaterModule({ service: services.theaterService, ...this.getRouteOptions() });
		this.durationModule = new DurationModule({ service: services.durationService, ...this.getRouteOptions() });
		this.ticketModule = new TicketModule({ service: services.ticketService, ...this.getRouteOptions() });
		this.fileModule = new FileModule({ service: services.fileService, ...this.getRouteOptions() }, upload);
		this.paymentModule = new PaymentModule({ service: services.paymentService, ...this.getRouteOptions() });
		this.saleModule = new SaleModule({ service: services.saleService, ...this.getRouteOptions() });
	}

	exec() {
		this.authModule.exec();
		this.userModule.exec();
		this.profileModule.exec();
		this.categoryModule.exec();
		this.eventModule.exec();
		this.placeModule.exec();
		this.phoneModule.exec();
		this.theaterModule.exec();
		this.durationModule.exec();
		this.ticketModule.exec();
		this.fileModule.exec();
		this.paymentModule.exec();
		this.saleModule.exec();
		this.app.use('/media', express.static(resolve(__dirname, '../..', 'tmp', 'uploads')));
		this.app.use(notfoundRoute);
	}

	private getRouteOptions(): RouteOptions {
		return { app: this.app, auth: this.auth };
	}
}

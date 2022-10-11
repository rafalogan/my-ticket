import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { TicketController } from './ticket.controller';
import { TicketRoute } from './ticket.route';
import { TicketService } from 'src/services';

export class TicketModule extends CommonModule {
	private readonly ticketController: TicketController;
	private ticketRoute: TicketRoute;

	constructor(options: ModuleOptions<TicketService>) {
		super();

		this.ticketController = new TicketController(options.service);
		this.ticketRoute = new TicketRoute(options, this.ticketController);
	}

	exec = () => this.ticketRoute.exec();
}

import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';

export class newsletterModule extends CommonModule {
private readonly newsletterController: ;
private newsletterRoute: ;

constructor(options: ModuleOptions<>) {
	super();

  this.newsletterController =
  this.newsletterRoute =
}

exec = () => this.newsletterRoute.exec();
}

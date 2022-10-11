import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';
import { FileController } from 'src/modules/file/file.controller';
import { FileRoute } from 'src/modules/file/file.route';
import { FileService } from 'src/services';
import { Multer } from 'multer';

export class FileModule extends CommonModule {
	private readonly fileController: FileController;
	private fileRoute: FileRoute;

	constructor(options: ModuleOptions<FileService>, upload: Multer) {
		super();

		this.fileController = new FileController(options.service);
		this.fileRoute = new FileRoute(options, this.fileController, upload);
	}

	exec = () => this.fileRoute.exec();
}

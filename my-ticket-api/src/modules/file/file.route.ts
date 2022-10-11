import { Multer } from 'multer';

import { Routes } from 'src/core/abstracts';
import { FileController } from 'src/modules/file/file.controller';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class FileRoute extends Routes {
	constructor(options: RouteOptions, private fileController: FileController, private upload: Multer) {
		super(options.app, options.auth);
	}

	exec() {
		this.app
			.route('/files')
			.all(this.auth?.exec().authenticate())
			.get(this.fileController.list.bind(this.fileController))
			.post(this.upload.single('file'), this.fileController.save.bind(this.fileController))
			.all(methodNotAllowed);

		this.app
			.route('/files/:id')
			.all(this.auth?.exec().authenticate())
			.get(this.fileController.list.bind(this.fileController))
			.put(this.fileController.save.bind(this.fileController))
			.delete(this.fileController.remove.bind(this.fileController))
			.all(methodNotAllowed);
	}
}

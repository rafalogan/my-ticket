import { PaginationOptions } from 'src/repositories/types';

export class Pagination {
	count: number;
	page: number;
	pages: number;
	limit: number;

	constructor(options: PaginationOptions) {
		this.count = Number(options.count);
		this.page = Number(options.page);
		this.pages = this.setPages(options);
		this.limit = Number(options.limit);
	}

	private setPages(options: PaginationOptions) {
		const { count, limit } = options;
		return Number(Math.ceil(count / limit));
	}
}

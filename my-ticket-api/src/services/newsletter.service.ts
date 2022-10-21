import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, INewsletter, List, ReadNewsletterOptions, ReadOptions } from 'src/repositories/types';
import { DatabaseException, existsOrError, messages, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';
import { Newsletter } from 'src/repositories/entities';
import { onLog } from 'src/core/handlers';

export class NewsletterService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	validate(data: INewsletter) {
		existsOrError(data.email, messages.requires('E-mail'));
	}

	create(item: Newsletter) {
		if (!item.active) item.active = true;

		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: Newsletter) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAll(options?: ReadOptions) {
		return super
			.findAll(options)
			.then(res => (res instanceof DatabaseException ? res : this.setNewsLetter(res)))
			.catch(err => err);
	}

	read(options?: ReadNewsletterOptions): Promise<any> {
		if (options?.email) return this.findOneByEmail(options.email, options);

		return super.read(options);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => {
				onLog('response newsletter', res);

				return res instanceof DatabaseException ? res : new Newsletter(res);
			})
			.catch(err => err);
	}

	findOneByEmail(email: string, options?: ReadOptions) {
		if (this.activeCache) {
			return this.checkCache(options)
				.then(res => this.setSingleResponse(res))
				.catch(err => err);
		}

		return super
			.findOneByWhere('email', email)
			.then(res => this.setSingleResponse(res))
			.catch(err => err);
	}

	async delete(id: number) {
		const item = await this.findOneById(id);
		try {
			existsOrError(item, messages.notFoundRegister);
		} catch (err) {
			return err;
		}

		item.active = false;

		return super
			.update(id, item)
			.then(res => this.setDeleteResponse(res, item))
			.catch(err => err);
	}

	private setNewsLetter(value: List<INewsletter>): List<Newsletter> {
		const data = value.data.map(i => new Newsletter(i));
		return { ...value, data };
	}

	private setSingleResponse(value: any) {
		if (!value) return {};
		if (value.severity === 'ERROR') return new DatabaseException(value.detail || value.hint || messages.notFoundRegister, value);
		return new Newsletter(value);
	}

	private setDeleteResponse(value: any, data: Newsletter) {
		if (!value) return {};
		if (value.severity === 'ERROR') return new DatabaseException(value.detail || value.hint || messages.notFoundRegister, value);

		return { id: data.id, deleted: value > 0, message: messages.successDel, element: data };
	}

	checkCache(options?: ReadNewsletterOptions): Promise<any> {
		if (options?.email) {
			return this.findCache(
				[`GET:content`, this.findOneByEmail.name, options.email],
				() => this.findOneByEmail(options.email as string, options),
				options?.cacheTime || this.defaultTime
			);
		}

		return super.checkCache(options);
	}
}

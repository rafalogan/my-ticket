import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IPhone, List, ReadOptions } from 'src/repositories/types';
import {
	camelToSnake,
	DatabaseException,
	existsOrError,
	messages,
	responseDataBaseCreate,
	responseDataBaseUpdate,
	responseNotFoundRegister,
} from 'src/utils';
import { Phone } from 'src/repositories/entities';

export class PhoneService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	validate(data: IPhone) {
		existsOrError(data.type, messages.requires('Tipo'));
		existsOrError(data.number, messages.requires('Numero'));
	}

	create(item: Phone) {
		return super
			.create(item)
			.then(res => responseDataBaseCreate(res, item))
			.catch(err => err);
	}

	update(id: number, values: Phone) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (res instanceof DatabaseException ? res : res.status ? res : new Phone(res)))
			.catch(err => err);
	}

	findAll(options?: ReadOptions) {
		return super
			.findAll(options)
			.then(res => (res instanceof DatabaseException ? res : this.setPhones(res)))
			.catch(err => err);
	}

	findPonhesUserOrPlaceId(where: string, id: number, options?: ReadOptions) {
		where = camelToSnake(where);
		return this.conn(this.table)
			.select(...(options?.fields || this.fields))
			.where(where, id)
			.then((res: any) => {
				if (!res) return responseNotFoundRegister(where, id);
				if (!res.length && res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);
				return res.map((phone: IPhone) => new Phone(phone));
			})
			.catch(err => err);
	}

	private setPhones(value: List<Phone>) {
		value.data = value.data.map(v => new Phone(v));
		return value;
	}
}

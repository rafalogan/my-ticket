import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IAddress, List, ReadOptions } from 'src/repositories/types';
import { Address } from 'src/repositories/entities';
import {
	camelToSnake,
	DatabaseException,
	existsOrError,
	messages,
	responseDataBaseCreate,
	responseDataBaseUpdate,
	responseNotFoundRegister,
} from 'src/utils';
import { onLog } from 'src/core/handlers';

export class AddressService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	async validate(data: IAddress) {
		existsOrError(data.zipCode, messages.requires('CEP'));
		existsOrError(data.street, messages.requires('Rua/Quadra/Logradouro'));
		existsOrError(data.district, messages.requires('Bairro'));
		existsOrError(data.city, messages.requires('Cidade'));
		existsOrError(data.state, messages.requires('Estado'));
	}

	create(data: Address) {
		return super
			.create(data)
			.then(res => responseDataBaseCreate(res, data))
			.catch(err => err);
	}

	update(id: number, values: any) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findOneByWhere(column: string, value: any) {
		column = camelToSnake(column);
		return super
			.findOneByWhere(column, value)
			.then(res => {
				if (!res) return responseNotFoundRegister(column, value);
				if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);
				if (res.status) return res;
				return new Address(res);
			})
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => (res instanceof DatabaseException ? res : res.status ? res : new Address(res)))
			.catch(err => err);
	}

	async findAll(options?: ReadOptions) {
		return super
			.findAll(options)
			.then(res => (res instanceof DatabaseException ? res : this.setAllAddress(res)))
			.catch(err => err);
	}

	private setAllAddress(values: List<Address>) {
		values.data = values.data.map(v => new Address(v));
		return values;
	}
}

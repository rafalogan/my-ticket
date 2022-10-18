import { BaseService } from 'src/core/abstracts';
import { BaseServiceOptions, IPayment, ReadOptions } from 'src/repositories/types';
import { Payment } from 'src/repositories/entities';
import { DatabaseException, messages, responseDataBaseCreate, responseDataBaseUpdate } from 'src/utils';

export class PaymentService extends BaseService {
	constructor(options: BaseServiceOptions) {
		super(options);
	}

	create(value: Payment) {
		return super
			.create(value)
			.then(res => responseDataBaseCreate(res, value))
			.catch(err => err);
	}

	update(id: number, values: Payment) {
		return super
			.update(id, values)
			.then(res => responseDataBaseUpdate(res, values))
			.catch(err => err);
	}

	findAll(options: ReadOptions) {
		const userId = Number(options.userId);
		return super.findAllByUser(userId, options).then(res => {
			if (!res) return [];
			if (res.severity === 'ERROR' || !Array.isArray(res)) {
				return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);
			}
			return res.map((res: IPayment) => new Payment(res));
		});
	}

	findOneById(id: number, options?: ReadOptions) {
		return super
			.findOneById(id, options)
			.then(res => {
				if (!res) return {};
				if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.notFoundRegister, res);

				return new Payment(res);
			})
			.catch(err => err);
	}
}

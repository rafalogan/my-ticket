import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setParamsOrder, setReadOptions } from 'src/utils';
import { AddressService } from 'src/services';
import { Address } from 'src/repositories/entities';
import { getIdByReq, onLog } from 'src/core/handlers';

export class AddressController extends Controller {
	constructor(private addressService: AddressService) {
		super();
	}

	async save(req: Request, res: Response) {
		try {
			await this.addressService.validate(req.body);
		} catch (err) {
			return responseApi(res, err, httpStatus.BAD_REQUEST);
		}

		const address = new Address(req.body);
		const replaceAddress = await this.setDefaultAdress(address);

		if (typeof replaceAddress !== 'string') return responseApiError({ res, err: replaceAddress, message: replaceAddress.message });
		this.addressService
			.save(address)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	edit(req: Request, res: Response) {
		const id = getIdByReq(req);
		const address = new Address(req.body, id);

		this.addressService
			.save(address)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	listByUserOrPlace(req: Request, res: Response) {
		const params = this.setParamsOrder(req);

		onLog('params', params);

		this.addressService
			.findOneByWhere(params.where as string, params.value)
			.then((data: any) => responseApi(res, data, data?.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	list(req: Request, res: Response) {
		const options = setReadOptions(req);

		this.addressService
			.read(options)
			.then(data => responseApi(res, data, data.status))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	remove(req: Request, res: Response) {
		const id = getIdByReq(req);

		this.addressService
			.delete(id)
			.then(data => responseApi(res, data))
			.catch(err => responseApiError({ res, err, message: err.message }));
	}

	private setParamsOrder(req: Request) {
		return setParamsOrder(req);
	}

	private async setDefaultAdress(data: Address) {
		try {
			const fromDB = data.userId
				? await this.addressService.findPrincipalAddress('userId', data.userId)
				: await this.addressService.findPrincipalAddress('placeId', data.placeId);

			if (data.main && fromDB.main) {
				fromDB.main = false;
				return this.addressService
					.save(fromDB)
					.then(() => 'ok')
					.catch(err => err);
			}

			return 'ok';
		} catch (err) {
			return err;
		}
	}
}

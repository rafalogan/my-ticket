import { v4 } from 'uuid';

import { CredCardPaymentModel, DebitCardPaymentModel } from 'src/repositories/models';
import { IPPayResponse, IPPayResponsePix } from 'src/repositories/types';
import { Sale } from 'src/repositories/entities';

export class PayService {
	constructor() {}

	async executePayment<T>(data: T, sale: Sale): Promise<IPPayResponse | IPPayResponsePix> {
		if (data instanceof CredCardPaymentModel || data instanceof DebitCardPaymentModel) {
			return this.responseCreditOrDebit(sale);
		}

		return this.responsePixTransacion(sale);
	}

	async execCancelPayment<T>(data: T, sale: Sale): Promise<IPPayResponse | IPPayResponsePix> {
		if (data instanceof CredCardPaymentModel || data instanceof DebitCardPaymentModel) {
			return this.responseCreditOrDebit(sale);
		}

		return this.responsePixTransacion(sale);
	}

	private responseCreditOrDebit = (sale: Sale): IPPayResponse => ({
		statusPagamento: 'Sucesso',
		status: 'EmAnalise',
		codigoMoIP: Number(8067235),
		totalPago: `${sale.total / 100}`,
		taxaMoIP: '13.49',
		mensagem: 'Requisição processada com sucesso',
		codigoRetorno: '012345',
		classificacao: {
			codigo: 3,
			descricao: 'Politica do banco emissor',
		},
	});

	private responsePixTransacion = (sale: Sale): IPPayResponsePix => ({
		codigoPix: `${v4()}${Date.now()}`,
		statusPagamento: 'Sucesso',
		status: 'EmAnalise',
		codigoMoIP: Number(8067235),
		totalPago: sale.total.toFixed(2),
		taxaMoIP: `${sale.total * (2 / 100)}`,
		mensagem: 'Requisição processada com sucesso',
		codigoRetorno: '012345',
		classificacao: {
			codigo: 3,
			descricao: 'Politica do banco emissor',
		},
	});
}

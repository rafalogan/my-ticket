import { PayParams } from 'src/repositories/models';
import { IPayResponseClasificacao, IPPayResponse } from 'src/repositories/types';
import { Sale } from 'src/repositories/entities';

export class PayService {
	constructor() {}

	executePayment = (data: PayParams, sale: Sale): Promise<IPPayResponse> => {
		return new Promise(resolve =>
			setTimeout(
				() => ({
					StatusPagamento: 'Sucesso',
					Status: 'EmAnalise',
					CodigoMoIP: Number(8067235),
					TotalPago: `${sale.total / 100}`,
					TaxaMoIP: '13.49',
					Mensagem: 'Requisição processada com sucesso',
					CodigoRetorno: '012345',
					Classificacao: {
						Codigo: 3,
						Descricao: 'Politica do banco emissor',
					},
				}),
				3000
			)
		)
			.then(res => res as IPPayResponse)
			.catch(err => err);
	};
}

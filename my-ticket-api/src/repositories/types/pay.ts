import { ISale } from './sale';

export interface IPay {
	Forma: string;
	Instituicao: string;
	Parcelas: string;
	CartaoCredito: IPayCard;
}

export interface IPayCard {
	Numero: string;
	Expiracao: string;
	CodigoSeguranca: string;
	Portador: IPayPortador;
}

export interface IPayPortador {
	Nome: string;
	DataNascimento: string;
	Telefone: string;
	Cpf: string;
}

export interface IPPayResponse {
	StatusPagamento: string;
	Status: string;
	CodigoMoIP: number;
	TotalPago: string;
	TaxaMoIP: string;
	Mensagem: string;
	CodigoRetorno: string;
	Classificacao: IPayResponseClasificacao;
}

export interface IPayResponseClasificacao {
	Codigo: number;
	Descricao: string;
}

export interface ICompleteSale {
	payPrams: IPay;
	sale: ISale;
	seats: number[];
}

import { ISale } from './sale';
import { IID } from 'src/repositories/types/shared';
import { Payment, Sale } from 'src/repositories/entities';

export interface IPayment extends IID, SharedParams {
	forma: string;
	numero: string;
	instituicao: string;
	expiracao: string;
	codigoSeguranca: string;
	nome: string;
	cpf: string;
	active: boolean;
	userId: number;
}

interface SharedParams {
	forma: string;
}

export interface IPayCredtCrad extends SharedParams {
	instituicao: string;
	parcelas: string;
	cartaoCredito: IPayCard;
}

export interface IPayDebitCard extends SharedParams {
	instituicao: string;
	cartaoDebito: IPayCard;
}

export interface IPayPix extends SharedParams {
	codigo: string;
}

export interface IPay<T> {
	metodo: T;
}

export interface IPayCard {
	numero: string;
	expiracao: string;
	codigoSeguranca: string;
	portador: IPayPortador;
}

export interface IPayPortador {
	nome: string;
	dataNascimento?: string;
	telefone?: string;
	cpf: string;
}

export interface IPPayResponse {
	statusPagamento: string;
	status: string;
	codigoMoIP: number;
	totalPago: string;
	taxaMoIP: string;
	mensagem: string;
	codigoRetorno: string;
	classificacao: IPayResponseClasificacao;
}

export interface IPPayResponsePix extends IPPayResponse {
	codigoPix: string;
}

export interface IPayResponseClasificacao {
	codigo: number;
	descricao: string;
}

export interface ICompleteSale {
	sale: ISale | Sale;
	payment: IPayment | Payment;
}

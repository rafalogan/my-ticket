import { IPayment } from 'src/repositories/types';

export class Payment {
	id?: number;
	forma: string;
	numero: string;
	instituicao: string;
	expiracao: string;
	codigoSeguranca: string;
	nome: string;
	cpf: string;
	active: boolean;
	userId: number;

	constructor(data: IPayment, id?: number) {
		this.id = Number(id || data.id) || undefined;
		this.forma = data.forma;
		this.numero = data.numero;
		this.instituicao = data.instituicao;
		this.expiracao = data.expiracao;
		this.codigoSeguranca = data.codigoSeguranca;
		this.nome = data.nome;
		this.cpf = data.cpf;
		this.active = data.active || true;
		this.userId = Number(data.userId);
	}
}

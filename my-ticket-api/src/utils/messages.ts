import { User } from 'src/repositories/entities';
import { upperCaseFirstLetter } from 'src/utils/convert-date';

const alreadyExists = 'já existe';

const user = {
	alreadyExists: (email: string) => `${upperCaseFirstLetter(alreadyExists)} usuário resistrado com eses e-mail: ${email}`,
	success: {
		save: (user: User) => `Usuário ${user.email} salvo com sucesso`,
		update: (user: User) => `Usuário ${user.email} atualizado com sucesso`,
		cancel: (user: User) => `Usuário ${user.email} cancelado com sucesso`,
	},

	error: {
		notFoundById: (id: number) => `Usuário nº:${id} não encontrado!`,
		notFoundByEmail: (email: string) => `Usuário não encontrado para esse e-mail: ${email}`,
		noMatchCredentials: `Falha na autenticação verifique suas credenciais!`,
		noMatchPasswords: `Falha a senha e a confirmação de senha devem ser iguais!`,
		requires: (field: string) => `${field} é um campo obrigatório.`,
	},
};

export const messages = {
	alreadyExists,
	user,
};

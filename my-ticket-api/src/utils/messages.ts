import { User } from 'src/repositories/entities';
import { upperCaseFirstLetter } from 'src/utils/convert-date';

const alreadyExists = 'já existe';
const requires = (field: string) => `${field} é um campo obrigatório.`;

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

const profile = {
	success: {
		create: `Novo perfil criado com sucesso.`,
		update: (id: number) => `Perfil nº: ${id} atualizado com sucesso!`,
	},
	error: {
		alreadyExists: `${upperCaseFirstLetter(alreadyExists)} um perfil com esse nome!`,
	},
};

const auth = {
	success: {
		signup: 'Novo usuário cadastrado com sucesso.',
		tokenIsValid: 'Token Valido.',
	},

	error: {
		requires: 'Os campos e-mail e senha são obrigatórios, verifique se ambos estão preenchidos corretamente.',
		Unauthorized: 'Login não autorizado! Verrifique seu  e-maul e /ou senha.',
		tokenNoValid: 'Token Invalido.',
		notFoundToken: 'Token não encontrado!',
		notFoundPayload: 'Payload não encontrado!',
	},
};

export const messages = {
	alreadyExists,
	requires,
	user,
	profile,
	auth,
};

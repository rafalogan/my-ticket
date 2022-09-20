export interface IUser {
	id?: number;
	firstName: string;
	lastName: string;
	cpf: string;
	email: string;
	profileId: number;
	deletedAt?: Date;
}

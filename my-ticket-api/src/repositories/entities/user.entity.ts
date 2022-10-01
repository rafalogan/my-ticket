import { IUser } from 'src/repositories/types';
import { hashString } from 'src/utils';

export class User {
	private _id: number;
	private _firstName: string;
	private _lastName: string;
	private _cpf: string;
	private _email: string;
	private _password: string;
	private _profileId: number;
	private _deletedAt?: Date;

	constructor(data: IUser, id?: number) {
		Object.assign(this, data);

		if (id) this.id = id;
	}

	get id() {
		return this._id;
	}

	set id(value: number) {
		this._id = Number(value);
	}

	get firstName(): string {
		return this._firstName;
	}

	set firstName(value: string) {
		this._firstName = value;
	}

	get lastName(): string {
		return this._lastName;
	}

	set lastName(value: string) {
		this._lastName = value;
	}

	get cpf(): string {
		return this._cpf;
	}

	set cpf(value: string) {
		this._cpf = value;
	}

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get password(): string {
		return this._password;
	}

	set password(value: string) {
		this._password = value;
	}

	get profileId() {
		return this._profileId;
	}

	set profileId(value: number) {
		this._profileId = Number(value);
	}

	get deletedAt() {
		return this._deletedAt;
	}

	set deletedAt(value: Date | undefined) {
		this._deletedAt = value ? new Date(value) : value;
	}
}

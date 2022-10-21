import { IUser, List, ReadOptions, ResultUpdate, UpdatePasswordOptions, UserServiceOptions } from 'src/repositories/types';
import { User } from 'src/repositories/entities';
import { Credentials, UserModel } from 'src/repositories/models';
import {
	deleteField,
	equalsOrError,
	existsOrError,
	hashString,
	isMatchOrError,
	messages,
	notExistisOrError,
	responseDataBaseCreate,
	DatabaseException,
	userOtherTablesFiled,
} from 'src/utils';
import { BaseService } from 'src/core/abstracts';
import { onLog } from 'src/core/handlers';

export class UserService extends BaseService {
	salt: number;

	constructor(data: UserServiceOptions) {
		super(data);
		this.salt = data.salt;
	}

	set(data: IUser, id?: number) {
		if (id) return new User(data, id);
		if (data.password) data.password = hashString(data.password, this.salt);

		return new User(data);
	}

	save(user: User) {
		onLog('user to seave or update: ', user);

		if (user.id) {
			return this.update(user.id, user)
				.then(result => (result instanceof DatabaseException ? result : { ...result, user }))
				.catch(err => err);
		}

		return this.create(user)
			.then(result => responseDataBaseCreate(result, user))
			.catch(err => err);
	}

	findAll(options?: ReadOptions) {
		return super
			.findAll(options)
			.then(res => (!res || res instanceof DatabaseException ? res : this.setUsers(res)))
			.catch(err => err);
	}

	findOneById(id: number, options?: ReadOptions): Promise<any> {
		const fields = options?.fields ? options.fields.map(i => `u.${i}`) : this.fields.map(i => `u.${i}`);

		return this.conn({ u: this.table, p: 'profiles' })
			.select(...fields, userOtherTablesFiled.profile)
			.whereRaw('u.id = ?', [id])
			.andWhereRaw('p.id = u.profile_id')
			.first()
			.then(res => this.responseFindUser(res))
			.catch(err => err);
	}

	async updatePassword(options: UpdatePasswordOptions) {
		const userFromDB = await this.findUserByEmail(options.email);

		try {
			existsOrError(userFromDB, messages.user.error.notFoundByEmail(options.email));
			equalsOrError(options.password, options.confirmPassword, messages.user.error.noMatchPasswords);

			if (options.oldPassword) {
				const credentials = new Credentials(options);
				isMatchOrError({ credentials, user: userFromDB, message: messages.user.error.noMatchCredentials });
			}
		} catch (err) {
			return err;
		}

		const user = new User(userFromDB);
		user.password = hashString(options.password, this.salt);

		return this.save(user);
	}

	findUserByEmail(email: string) {
		return this.conn({ u: this.table, p: 'profiles' })
			.select(...this.fields.map(i => `u.${i}`), userOtherTablesFiled.profile)
			.whereRaw('u.email = ?', [email])
			.andWhereRaw('p.id = u.profile_id')
			.first()
			.then(res => this.responseFindUser(res))
			.catch(err => err);
	}

	findUsersByProfileId(profileId: number) {
		return this.conn(this.table)
			.select(...this.fields)
			.where({ profile_id: profileId })
			.then((result: IUser[]) => result.map(user => new User(user)))
			.catch(err => err);
	}

	async delete(id: number) {
		const element: IUser = await this.findOneById(id);

		try {
			existsOrError(element, messages.user.error.notFoundById(id));
		} catch (err) {
			return { message: err };
		}

		const user = (await this.set(element, element.id)) as User;
		user.deletedAt = new Date();

		return this.update(id, user)
			.then((result: DatabaseException | ResultUpdate) =>
				result instanceof DatabaseException ? result : { id, message: messages.successDel, element }
			)
			.catch(err => err);
	}

	async validateNewUser(data: IUser) {
		const userFromDB = await this.findUserByEmail(data.email);

		existsOrError(data.firstName, messages.user.error.requires('Nome'));
		existsOrError(data.lastName, messages.user.error.requires('Sobrenome'));
		existsOrError(data.email, messages.user.error.requires('E-mail'));
		existsOrError(data.password, messages.user.error.requires('Senha'));
		existsOrError(data.confirmPassword, messages.user.error.requires('Confirmação de Senha'));
		equalsOrError(data.password, data.confirmPassword, messages.user.error.noMatchPasswords);
		notExistisOrError(userFromDB, messages.user.alreadyExists(data.email));
	}

	private userNoPassword(user: User | UserModel) {
		deleteField(user, 'password');
		return user;
	}

	private setUsers(users: List<IUser>): List<User> {
		const data = users.data
			.map(user => new User(user))
			.map(this.userNoPassword)
			.map(this.shortUser) as User[];
		return { ...users, data };
	}

	private shortUser(user: IUser | User | UserModel) {
		const fields = ['zipCode', 'street', 'number', 'complement', 'district', 'city', 'state', 'profileId', 'deletedAt'];
		fields.forEach(field => deleteField(user, field));
		return user;
	}

	private responseFindUser(res: any) {
		if (!res) return {};
		if (res.severity === 'ERROR') return new DatabaseException(res.detail || res.hint || messages.user.error.notFound, res);
		return new UserModel(res);
	}
}

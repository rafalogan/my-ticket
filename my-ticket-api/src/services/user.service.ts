import { BaseService } from 'src/core/service';
import { IUser, IUserModel, UpdatePasswordOptions, UserServiceOptions } from 'src/repositories/types';
import { User } from 'src/repositories/entities';
import { Credentials, UserModel } from 'src/repositories/models';
import { deleteField, equalsOrError, existsOrError, hashString, isMatchOrError, messages, notExistisOrError } from 'src/utils';

export class UserService extends BaseService {
	salt: number;
	constructor(data: UserServiceOptions) {
		super(data);
		this.salt = data.salt;
	}

	async set(data: IUser, id?: number) {
		if (id) return new User(data, id);

		try {
			await this.validateNewUser(data);
		} catch (error) {
			return error;
		}

		return new User(data);
	}

	save(user: User) {
		if (user.id) {
			return this.update(user.id, user)
				.then(result => ({ result, id: user.id, message: messages.user.success.update(user), user }))
				.catch(err => err);
		}

		return this.create(user)
			.then(result => ({ result, message: messages.user.success.save(user), user: this.userNoPassword(user) }))
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
		return this.conn(this.table)
			.select(...this.fields)
			.where({ email })
			.join('profiles', function () {
				this.on('proeiles.id', '=', 'users.profile_id');
			})
			.as('profile')
			.first()
			.then((user: IUserModel) => new UserModel(user))
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
			.then(result => ({ result, message: messages.user.success.cancel(user), user: this.userNoPassword(user) }))
			.catch(err => err);
	}

	private async validateNewUser(data: IUser) {
		const userFromDB = await this.findUserByEmail(data.email);

		try {
			existsOrError(data.firstName, messages.user.error.requires('Nome'));
			existsOrError(data.lastName, messages.user.error.requires('Sobrenome'));
			existsOrError(data.email, messages.user.error.requires('E-mail'));
			existsOrError(data.password, messages.user.error.requires('Senha'));
			existsOrError(data.confirmPassword, messages.user.error.requires('Confirmação de Senha'));
			equalsOrError(data.password, data.confirmPassword, messages.user.error.noMatchPasswords);
			notExistisOrError(userFromDB, messages.user.alreadyExists(data.email));

			data.password = hashString(data.password, this.salt);
		} catch (err) {
			return err;
		}
	}

	private userNoPassword(user: User) {
		const data = Object.create(user);

		return deleteField(data, 'password');
	}
}

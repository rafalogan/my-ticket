import { BaseServiceOptions, IProfile, Profiles, ReadOptions } from 'src/repositories/types';
import { Profile, User } from 'src/repositories/entities';
import { DatabaseException, existsOrError, messages, notExistisOrError, responseDataBaseCreate, ResponseException } from 'src/utils';
import { UserService } from 'src/services/user.service';
import { BaseService } from 'src/core/abstracts';

export class ProfileService extends BaseService {
	constructor(data: BaseServiceOptions, private userService: UserService) {
		super(data);
	}

	set(data: IProfile, id?: number) {
		if (id) return new Profile(data, id);
		return new Profile(data);
	}

	save(data: Profile) {
		if (data.id) {
			return this.update(data.id, data)
				.then(result => (result instanceof DatabaseException ? result : { ...result, data }))
				.catch(err => err);
		}

		return this.create(data)
			.then(result => responseDataBaseCreate(result, data))
			.catch(err => err);
	}

	read(options?: ReadOptions): Promise<any> {
		return super
			.read(options)
			.then((result: IProfile | Profiles | DatabaseException) =>
				result instanceof DatabaseException ? result : 'data' in result ? this.setProfiles(result) : new Profile(result)
			)
			.catch(err => err);
	}

	async remove(idToDelete: number, idToMigrate: number) {
		try {
			const usersToMigrate = (await this.userService.findUsersByProfileId(idToDelete)) || [];
			const usersPrepare = usersToMigrate.map((user: User) => {
				user.profileId = idToMigrate;
				return user;
			});
			if (usersPrepare.length) {
				usersPrepare.map((user: User) => this.userService.save(user));
			}
		} catch (err) {
			return err;
		}

		return super.delete(idToDelete);
	}

	findProfileByName(name: string) {
		return this.conn(this.table)
			.select(...this.fields)
			.where({ name })
			.first()
			.then((result: IProfile) => (result ? new Profile(result) : {}))
			.catch(err => err);
	}

	async profileValidate(data: IProfile) {
		const profileFromDb = await this.findProfileByName(data.name);

		existsOrError(data.name, messages.requires('Nome'));
		notExistisOrError(profileFromDb, messages.profile.error.alreadyExists);
	}

	private setProfiles(value: Profiles) {
		value.data = value.data.map(profile => new Profile(profile));
		return value;
	}
}

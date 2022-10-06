import { BaseServiceOptions, IProfile, Profiles, ReadOptions } from 'src/repositories/types';
import { Profile, User } from 'src/repositories/entities';
import { existsOrError, messages, notExistisOrError, ResponseException } from 'src/utils';
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
			return this.update(data.id, data).then(result =>
				result.severity === 'ERROR'
					? new ResponseException(messages.profile.error.noEdit(Number(data.id)), result)
					: {
							id: data.id,
							edit: result === 1,
							message: messages.profile.success.update(Number(data.id)),
							profile: data,
					  }
			);
		}

		return this.create(data).then(result => ({
			result,
			message: messages.profile.success.create,
			profile: data,
		}));
	}

	read(options?: ReadOptions): Promise<any> {
		return super
			.read(options)
			.then((result: IProfile | Profiles) => ('data' in result ? this.setProfiles(result) : new Profile(result)))
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
		try {
			const profileFromDb = await this.findProfileByName(data.name);

			existsOrError(data.name, messages.requires('Nome'));
			notExistisOrError(profileFromDb, messages.profile.error.alreadyExists);
			return;
		} catch (err) {
			return err;
		}
	}

	private setProfiles(value: Profiles) {
		value.data = value.data.map(profile => new Profile(profile));
		return value;
	}
}

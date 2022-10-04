import { Knex } from 'knex';

import DefaultUsers from 'database/assets/default-users.json';
import { hashString } from 'src/utils';

export async function up(knex: Knex): Promise<void> {
	const resultUsers = DefaultUsers.map((user: any) => {
		user.password = hashString(user.password, Number(process.env.SALT_ROUNDS));
		return user;
	});

	return knex.batchInsert('users', resultUsers);
}

export async function down(knex: Knex): Promise<void> {
	return DefaultUsers.forEach((user: any) => knex('users').where('id', user.id).del());
}

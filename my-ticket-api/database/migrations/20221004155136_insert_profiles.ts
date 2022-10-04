import { Knex } from 'knex';
import DefaultProfiles from 'database/assets/default-profiles.json';

export async function up(knex: Knex): Promise<void> {
	return knex.batchInsert('profiles', DefaultProfiles);
}

export async function down(knex: Knex): Promise<void> {
	return DefaultProfiles.forEach((profile: any) => knex('profiles').where('id', profile.id).del());
}

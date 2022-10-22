import { Knex } from 'knex';
import DefaultTheaters from '../assets/default-theaters.json';

export async function up(knex: Knex): Promise<void> {
	return knex.batchInsert('theaters', DefaultTheaters);
}

export async function down(knex: Knex): Promise<void> {
	return DefaultTheaters.forEach(theater => knex('theaters').where('name', theater.name).del());
}

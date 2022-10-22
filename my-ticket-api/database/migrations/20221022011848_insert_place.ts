import { Knex } from 'knex';
import DefaultPlaces from '../assets/default-places.json';

export async function up(knex: Knex): Promise<void> {
	return knex.batchInsert('places', DefaultPlaces);
}

export async function down(knex: Knex): Promise<void> {
	return DefaultPlaces.forEach(place => knex('places').where('name', place.name).del());
}

import { Knex } from 'knex';
import DefaultCategories from '../assets/default-categories.json';

export async function up(knex: Knex): Promise<void> {
	return knex.batchInsert('categories', DefaultCategories);
}

export async function down(knex: Knex): Promise<void> {
	return DefaultCategories.forEach((category: any) => knex('categories').where('name', category.name).del());
}

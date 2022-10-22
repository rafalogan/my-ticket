import { Knex } from 'knex';

import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('events', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('title', 100).notNullable();
		table.string('subtitle', 150).nullable();
		table.binary('content').notNullable();
		table.integer('popularity').nullable();
		table.timestamp('release_date').nullable();
		table.integer('vote_average').nullable();
		table.integer('vote_count').nullable();
		table.string('type', 50).notNullable();
		table.integer('category_id').unsigned().references('id').inTable('categories').notNullable();
		table.integer('user_id').unsigned().references('id').inTable('users').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('events');
}

import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('categories', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name', 50).notNullable().unique();
		table.string('description', 1000).nullable();
		table.string('url').nullable();
		table.boolean('active').notNullable().defaultTo(true);
		table.integer('parent_id').unsigned().references('id').inTable('categories').nullable();
		table.integer('user_id').unsigned().references('id').inTable('users').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('categories');
}

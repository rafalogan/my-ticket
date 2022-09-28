import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('files', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('title', 100).nullable();
		table.binary('alt').nullable();
		table.string('name', 50).notNullable();
		table.string('type', 100).notNullable();
		table.string('url', 100).notNullable();
		table.integer('event_id').unsigned().references('id').inTable('events').nullable();
		table.integer('category_id').unsigned().references('id').inTable('categories').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('files');
}

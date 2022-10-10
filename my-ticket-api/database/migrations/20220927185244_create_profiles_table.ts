import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('profiles', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name', 50).notNullable().unique();
		table.string('description', 1000).nullable();
		table.boolean('active').notNullable().defaultTo(true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('profiles');
}

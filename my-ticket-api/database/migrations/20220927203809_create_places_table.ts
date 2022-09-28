import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('places', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name', 1000).notNullable();
		table.binary('description').nullable();
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('places');
}

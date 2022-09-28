import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('durations', (table: TableBuilder) => {
		table.increments('id').primary();
		table.timestamp('start').notNullable();
		table.timestamp('end').notNullable();
		table.integer('theater_id').unsigned().references('id').inTable('theaters').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('durations');
}

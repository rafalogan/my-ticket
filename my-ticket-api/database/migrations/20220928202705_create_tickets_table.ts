import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('tickets', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('code').notNullable();
		table.integer('amount').notNullable();
		table.integer('event_id').unsigned().references('id').inTable('events').notNullable();
		table.integer('place_id').unsigned().references('id').inTable('places').notNullable();
		table.integer('theater_id').unsigned().references('id').inTable('theaters').notNullable();
		table.integer('duration_id').unsigned().references('id').inTable('durations').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('tickets');
}

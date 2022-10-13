import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('seat_per_ticket', (table: TableBuilder) => {
		table.integer('seat_address_id').unsigned().references('id').inTable('seat_address').notNullable();
		table.integer('ticket_id').unsigned().references('id').inTable('tickets').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('seat_per_ticket');
}

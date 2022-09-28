import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('tickets_per_sales', (table: TableBuilder) => {
		table.integer('ticket_id').unsigned().references('id').inTable('tickets').notNullable();
		table.integer('sale_id').unsigned().references('id').inTable('sales').notNullable();
		table.string('armchair', 100).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('tickets_per_sales');
}

import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('contacts', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name', 100).notNullable();
		table.string('email', 100).notNullable();
		table.string('phone', 50).nullable();
		table.string('subject', 1000).notNullable();
		table.binary('message').notNullable();
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.integer('sale_id').unsigned().references('id').inTable('sales').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('contacs');
}

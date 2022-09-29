import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('sales', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('code', 1000).notNullable();
		table.integer('discount').nullable();
		table.integer('amount').notNullable();
		table.integer('unitary_value').notNullable();
		table.integer('total').notNullable();
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('sales');
}

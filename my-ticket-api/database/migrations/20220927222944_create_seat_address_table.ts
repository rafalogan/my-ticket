import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('seat_address', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('section', 50).nullable();
		table.string('row', 50).nullable();
		table.integer('seat').notNullable();
		table.integer('theater_id').unsigned().references('id').inTable('capacity').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('seat_address');
}

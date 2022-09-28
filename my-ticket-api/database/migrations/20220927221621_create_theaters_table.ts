import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('theaters', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name', 100).notNullable();
		table.binary('discription').nullable();
		table.integer('place_id').unsigned().references('id').inTable('places').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('theaters');
}

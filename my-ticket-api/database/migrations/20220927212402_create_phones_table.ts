import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('phones', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('type', 50).notNullable();
		table.string('number').notNullable();
		table.integer('user_id').unsigned().references('id').inTable('users').nullable();
		table.integer('place_id').unsigned().references('id').inTable('places').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('phones');
}

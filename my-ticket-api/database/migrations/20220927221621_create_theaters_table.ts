import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('theaters', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name', 100).notNullable();
		table.binary('description').nullable();
		table.integer('sections_number').nullable();
		table.string('sections_type', 100).nullable();
		table.integer('raws_per_section').nullable();
		table.string('rows_type', 100).nullable();
		table.integer('capacity').notNullable();
		table.boolean('addressed_seats').notNullable().defaultTo(false);
		table.integer('place_id').unsigned().references('id').inTable('places').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('theaters');
}

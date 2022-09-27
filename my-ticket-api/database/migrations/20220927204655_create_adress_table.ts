import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('address', (table: TableBuilder) => {
		table.increments('id').primary();
		table.boolean('main').notNullable().defaultTo(false);
		table.string('zip_code', 45).notNullable();
		table.string('street', 100).notNullable();
		table.string('number', 50).nullable();
		table.string('complement', 100).nullable();
		table.string('district', 50).notNullable();
		table.string('city', 100).notNullable();
		table.string('state', 50).notNullable();
		table.string('url_maps', 100).nullable();
		table.integer('user_id').unsigned().references('id').inTable('users').nullable();
		table.integer('place_id').unsigned().references('id').inTable('places').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('address');
}

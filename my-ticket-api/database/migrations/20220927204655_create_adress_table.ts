import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('adress', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('zip_code', 45).notNullable();
		table.string('street', 100).notNullable();
		table.string('number', 50).nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('adress');
}

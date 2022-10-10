import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('newsletter', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name', 100).nullable();
		table.string('email', 100).notNullable();
		table.boolean('active').notNullable().defaultTo(true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('newsletter');
}

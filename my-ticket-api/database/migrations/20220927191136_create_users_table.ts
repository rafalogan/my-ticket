import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('first_name', 100).nullable();
		table.string('last_name', 50).nullable();
		table.string('cpf').notNullable().unique();
		table.string('email', 1000).notNullable().unique();
		table.integer('profile_id').unsigned().references('id').inTable('profiles').notNullable();
		table.timestamp('deleted_at').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users');
}

import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('first_name', 100).notNullable();
		table.string('last_name', 50).notNullable();
		table.string('cpf').notNullable().unique();
		table.string('email', 1000).notNullable().unique();
		table.string('phone', 50).nullable();
		table.string('password', 1000).notNullable();
		table.string('zip_code', 45).notNullable();
		table.string('street', 100).notNullable();
		table.string('number', 50).nullable();
		table.string('complement', 100).nullable();
		table.string('district', 50).notNullable();
		table.string('city', 100).notNullable();
		table.string('state', 50).notNullable();
		table.integer('profile_id').unsigned().references('id').inTable('profiles').notNullable();
		table.timestamp('deleted_at').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users');
}

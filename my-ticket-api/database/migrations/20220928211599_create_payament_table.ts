import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('payments_formats', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('forma', 100).notNullable();
		table.string('numero', 100).notNullable();
		table.string('instituicao', 50).nullable();
		table.string('expiracao', 50).notNullable();
		table.string('codigo_seguranca', 50).notNullable();
		table.string('nome', 100).notNullable();
		table.string('cpf', 100).nullable();
		table.boolean('active').notNullable().unique();
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('payments_formats');
}

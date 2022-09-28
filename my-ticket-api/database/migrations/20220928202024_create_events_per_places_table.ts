import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('events_per_places', (table: TableBuilder) => {
		table.integer('event_id').unsigned().references('id').inTable('events').notNullable();
		table.integer('place_id').unsigned().references('id').inTable('places').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('events_per_places');
}

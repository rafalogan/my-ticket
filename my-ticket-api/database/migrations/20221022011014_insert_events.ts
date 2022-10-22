import { Knex } from 'knex';
import EventsDefault from 'database/assets/default-events.json';

export async function up(knex: Knex): Promise<void> {
	const parser = EventsDefault.map((e: any) => {
		e.release_date = new Date(e.release_date);
		return e;
	});

	return knex.batchInsert('events', parser);
}

export async function down(knex: Knex): Promise<void> {
	return EventsDefault.forEach((event: any) => knex('events').where('title', event.title).del());
}

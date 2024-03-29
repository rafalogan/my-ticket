import { Knex } from 'knex';
import EventsDefault from '../assets/default-events.json';

export async function up(knex: Knex): Promise<void> {
	const parser = EventsDefault.map((e: any) => {
		e.release_date = new Date(e.release_date);
		e.popularity = e.popularity * 1000;
		e.vote_average = e.vote_average * 10;
		return e;
	});

	return knex.batchInsert('events', parser);
}

export async function down(knex: Knex): Promise<void> {
	return EventsDefault.forEach((event: any) => knex('events').where('title', event.title).del());
}

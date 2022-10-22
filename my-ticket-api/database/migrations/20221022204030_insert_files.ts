import { Knex } from 'knex';
import DefaultFiles from '../assets/default-files.json';

export async function up(knex: Knex): Promise<void> {
	const prefix = process.env.ENABLE_HTTPS === 'true' ? 'https://' : 'http://';
	const prepare = DefaultFiles.map(file => {
		file.url = `${prefix}${process.env.HOST}:${Number(process.env.PORT)}${file.url}`;
		return file;
	});

	return knex.batchInsert('theaters', prepare as any);
}

export async function down(knex: Knex): Promise<void> {
	return DefaultFiles.forEach(f => knex('files').where('name', f.name).del());
}

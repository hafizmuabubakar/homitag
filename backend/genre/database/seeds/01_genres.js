exports.seed = async function (knex) {
	try {
		await knex('Genres')
			.insert([
				{ id: 1, name: 'Action', description: 'No description provided' },
				{ id: 2, name: 'Comedy', description: 'No description provided' },
			])
			.onConflict('id')
			.ignore();

		await knex.raw(
			'SELECT setval(\'"Genres_id_seq"\', (SELECT max(id) from "Genres"))',
		);
	} catch (err) {
		console.log(err);
	}
};

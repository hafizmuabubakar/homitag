/* eslint-disable quotes */
exports.seed = async function (knex) {
	try {
		await knex('Movies')
			.insert([
				{
					id: 1,
					name: 'Snowden',
					description:
						"The NSA's illegal surveillance techniques are leaked to the public by one of the agency's employees, Edward Snowden, in the form of thousands of classified documents distributed to the press.",
					release_date: '2016-09-16', // YYYY-MM-DD
					genres: '["Action", "Thriller"]',
					duration: 2.14,
					ratings: 7.3,
				},
			])
			.onConflict('id')
			.ignore();

		await knex.raw(
			'SELECT setval(\'"Movies_id_seq"\', (SELECT max(id) from "Movies"))',
		);
	} catch (err) {
		console.log(err);
	}
};

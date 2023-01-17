const { movieController } = require('../controllers');
const dbConfig = require('../database/DatabaseConfig');

const { StatusCode } = require('./../utilities/KeyMaster');

let genreId = 1;
const body = {
	movie: {
		name: 'Snowden',
		description:
			"The NSA's illegal surveillance techniques are leaked to the public by one of the agency's employees, Edward Snowden, in the form of thousands of classified documents distributed to the press.",
		release_date: '2016-09-16',
		genres: genreId,
		duration: 2.14,
		ratings: 7.3,
		created_at: '2022-10-08T20:07:10.977Z',
		updated_at: '2022-10-08T20:07:10.977Z',
	},
};

beforeAll(async () => {
	dbConfig.initializeDB();
});

afterAll(async (done) => {
	dbConfig.destroyKnex();
	done();
});

describe('UNIT TEST: MOVIE', () => {
	/* [MOVIE] TEST CASES */
	describe('MOVIE TEST CASES', () => {
		/* CREATE */
		it('Should CREATE new movie and output success status code', async () => {
			const { result } = await movieController.create(body.movie);
			body.movie['id'] = result.data.id;
			expect(result).toMatchObject({ status: StatusCode.CREATED });
		});
		/* NOT CREATE */
		it('Should NOT CREATE movie and output bad requeset status code', async () => {
			const { error } = await movieController.create({});
			expect(error).toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* LIST */
		it('Should LIST movie and output success status code', async () => {
			const { result } = await movieController.list();
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* GET (ID) */
		it('Should GET BY ID movie and output success status code', async () => {
			const { result } = await movieController.get({ id: body.movie.id });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* GET NOT (ID) */
		it('Should NOT GET BY ID movie and output not found status code', async () => {
			const { error } = await movieController.get({ id: 3543875 });
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});

		/* INDEXING POSTIVE */
		it('Should Search genre and output success status code', async () => {
			const { result } = await movieController.index({ text: body.movie.name });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* INDEXING NEGATIVE */
		it('Should NOT Search genre and output not found status code', async () => {
			const { error } = await movieController.index({
				text: 'odiashjdoisahdos',
			});
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});

		/* DELETE */
		it('Should DELETE movie and output success status code', async () => {
			const { result } = await movieController.delete({ id: body.movie.id });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* NOT DELETE */
		it('Should NOT DELETE movie and output not found status code', async () => {
			const { error } = await movieController.delete({ id: 3543875 });
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});
	});
});

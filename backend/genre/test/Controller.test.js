const { genreController } = require('../controllers');
const dbConfig = require('../database/DatabaseConfig');

const { StatusCode } = require('./../utilities/KeyMaster');

let genreId = 0;
const body = {
	genre: {
		id: genreId,
		name: 'Action',
		description: 'All action movies will be in this genre',
	},
};

beforeAll(async () => {
	dbConfig.initializeDB();
});

afterAll(async (done) => {
	dbConfig.destroyKnex();
	done();
});

describe('UNIT TEST: GENRE', () => {
	/* [GENRE] TEST CASES */
	describe('GENRE TEST CASES', () => {
		/* CREATE */
		it('Should CREATE new genre and output success status code', async () => {
			const { result } = await genreController.create(body.genre);
			body.genre['id'] = result.data.id;
			expect(result).toMatchObject({ status: StatusCode.CREATED });
		});
		/* NOT CREATE */
		it('Should NOT CREATE genre and output bad requeset status code', async () => {
			const { error } = await genreController.create({});
			expect(error).toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* LIST */
		it('Should LIST genres and output success status code', async () => {
			const { result } = await genreController.list();
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* GET (ID) */
		it('Should GET BY ID genre and output success status code', async () => {
			const { result } = await genreController.get({ id: body.genre.id });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* INDEXING POSTIVE */
		it('Should Search genre and output success status code', async () => {
			const { result } = await genreController.index({ text: body.genre.name });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* INDEXING NEGATIVE */
		it('Should NOT Search genre and output not found status code', async () => {
			const { error } = await genreController.index({
				text: 'odiashjdoisahdos',
			});
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});

		/* GET NOT (ID) */
		it('Should NOT GET BY ID genre and output not found status code', async () => {
			const { error } = await genreController.get({ id: 3543875 });
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});

		/* DELETE */
		it('Should DELETE genre and output success status code', async () => {
			const { result } = await genreController.delete({ id: body.genre.id });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* NOT DELETE */
		it('Should NOT DELETE genre and output not found status code', async () => {
			const { error } = await genreController.delete({ id: 3543875 });
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});
	});
});

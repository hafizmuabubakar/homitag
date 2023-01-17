const { genreController } = require('../controllers');

const router = require('express').Router();

router.post('/', async (req, res, next) => {
	req.response = await genreController.create(req.body);
	next();
});

router.get('/', async (req, res, next) => {
	req.response = await genreController.list();

	next();
});

router.get('/:id', async (req, res, next) => {
	req.response = await genreController.get(req.params);
	next();
});

router.get('/search/:text', async (req, res, next) => {
	req.response = await genreController.index(req.params);
	next();
});

router.delete('/:id', async (req, res, next) => {
	req.response = await genreController.delete(req.params);
	next();
});

module.exports = router;

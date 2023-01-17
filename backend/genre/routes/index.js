const router = require('express').Router();
const { sendResponse } = require('../utilities/Middleware');
const genreRoutes = require('./GenreRoutes');

router.use('/v1/genre', genreRoutes, sendResponse);
module.exports = router;

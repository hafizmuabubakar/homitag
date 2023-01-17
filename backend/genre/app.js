const express = require('express');
const { crossOriginResource } = require('./utilities/Middleware');
const databaseConfig = require('./database/DatabaseConfig');
const router = require('./routes');
const cors = require('cors');

const app = express();
databaseConfig.initializeDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(crossOriginResource);
app.use(cors());
app.use(router);

var server = require('http').createServer(app);

server.listen(process.env.GENRE_PORT, async () => {
	console.log('App started at port.', process.env.GENRE_PORT);
});

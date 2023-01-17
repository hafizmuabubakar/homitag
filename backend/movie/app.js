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

//importing Movie Controller
const { movieController } = require('./controllers');

app.get('/', (req, res) => {
	res.status(200).json({
		code: 200,
		message: 'Application is running fine',
	});
});


//EndPoints For Movie Service:
app.post('/movie/', async (req, res) => {
	data = await movieController.create(req.body);
	res.send(data);
});

app.get('/movie/', async (req, res) => {
	const data = await movieController.listMovies();
	res.send(data);
});

app.get('/movie/:id', async (req, res) => {
	req.response = await movieController.get(req.params);
	res.send(data);
});

app.get('/movie/search/:text', async (req, res) => {
	req.response = await movieController.index(req.params);
	res.send(data);
});

app.delete('/movie/:id', async (req, res) => {
	req.response = await movieController.delete(req.params);
	res.send(data);
});






var server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
	console.log('App started at port', PORT);
	// console.log('DATABASE_URL => ' + process.env.DATABASE_URL);
});

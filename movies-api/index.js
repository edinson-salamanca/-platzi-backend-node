const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');

const { errorHandler, logErrors } = require('./utils/middleware/errorHandlers');

// body parser
app.use(express.json());
moviesApi(app);

app.use(errorHandler);
app.use(logErrors);

/* app.get('/', function (req, res) {
  res.send('hello world');
});

app.get('/json', function (req, res) {
  res.json({ hello: 'word' });
});
 */
app.listen(config.port, function () {
  console.log(`listening http://localhost:${config.port}`);
});

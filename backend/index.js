const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const expressStatusMonitor = require('express-status-monitor');
const connectDB = require('./config/mongoose');
const routes = require('./routes');
const cors = require('cors'); // Add this line

dotenv.config({ path: '.env' });

const app = express();

connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');
app.use(expressStatusMonitor());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(cors());
// Here we define the api routes
app.use(routes);

const port = process.env.PORT || 7999;
const address = process.env.SERVER_ADDRESS || 'localhost';

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on http://${address}:${port}`));
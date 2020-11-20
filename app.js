// modules
const { join } = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// initial
const app = express();

// middlewares
app.use(morgan('short'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/stack', require('./routes/stack'));
app.use('/whois', require('./routes/domain'));

// export
module.exports = app;


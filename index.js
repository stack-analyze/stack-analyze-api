// modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

/** @type {number}  */
const port = process.env.PORT || 3000;

// initial
const app = express();

// middlewares
app.use(morgan('short'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/stack', require('./routes/stack'));

// start server
app.listen(port, () => console.info('api on port', port));

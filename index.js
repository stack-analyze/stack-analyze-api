// modules
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import stackPage from './routes/stack.js';

/** @type {number}  */
const port = process.env.PORT || 3000;

// initial
const app = express();

// middlewares
app.use(morgan('short'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

// routes
app.use('/stack', stackPage);

// start server
app.listen(port, () => console.info('api on port', port));

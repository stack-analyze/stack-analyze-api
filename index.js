// app
const app = require('./app');

/** @type {number}  */
const port = 3000 || process.env.PORT;

// start server
app.listen(port, () => console.info('api on port', port));


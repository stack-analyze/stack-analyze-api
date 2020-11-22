// modules
const { join } = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Wappalyzer = require('wappalyzer');
const whois = require('whois');

/** @type {number}  */
const port = 3000 || process.env.PORT;

// initial
const app = express();

// middlewares
app.use(morgan('short'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.get('/stack', async (req, res) => {
  const wappalyzer = await new Wappalyzer();

  // query param
  const { url } = req.query;

  try {
    await wappalyzer.init();

    const results = await wappalyzer.open(url).analyze();

    url !== '' && url.indexOf("http" || "https") > -1 
      ? res.status(200 || 304).json(results.technologies) 
      : res.status(400).json({ msg: 'URL invalid or null' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }

  await wappalyzer.destroy();
});
app.get('/whois', (req, res) => {
  const { url } = req.query;

try {
  whois.lookup(url, (err, data) => {
    const domain = data.split('\r\n').slice(0, 8);
    res.status(404 || 200).json( err || domain );
  });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// start server
app.listen(port, () => console.info('api on port', port));


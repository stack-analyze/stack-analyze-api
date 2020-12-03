// modules
const whois = require('whois');
const { Router } = require('express');

// initial
const router = Router()

// route
router.get('/', (req, res) => {
  const { url } = req.query;

try {
  whois.lookup(url, (err, data) => {
    const domain = data.split('\r\n').slice(0, 8);
    res.status(200 || 404).json( domain || err );
  });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// exports
module.exports = router;

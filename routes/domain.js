// modules
const { Router } = require('express');
const whois = require('whois');

// initial router
const router = Router();

// route
router.get('/', (req, res) => {
  const { url } = req.query;

try {
  whois.lookup(url, (err, data) => {
    const domain = data.split('\r\n').slice(0, 8);
    res.status(404 || 200).json( err || domain );
  });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// export
module.exports = router;


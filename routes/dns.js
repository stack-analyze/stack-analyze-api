// modules
const whois = require('whois-light');
const { Router } = require('express');

// initial
const router = Router();

// route
router.get('/', async (req, res) => {
  const { url } = req.query;
  
  if (url !== '') {
  try {
    const data = await whois.lookup(url);
    res.status(200 || 304).json({ domain: data});
  } catch (err) {
    res.status(400 || 500).json({ msg: err });
  }
  } else {
    res.status(404).json({ msg: 'no blank query'});
  }
});

// exports
module.exports = router;

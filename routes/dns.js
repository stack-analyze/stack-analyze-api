// modules
const whois = require('whois');
const { Router } = require('express');

// initial
const router = Router()

// route
router.get('/', (req, res) => {
  const { url } = req.query;
  
  whois.lookup(url, (err, data) => {
    if(url !== '') {
     const domain = data.split('\r\n').slice(0, 8);

     res.status(200).json( domain || err );
    } else { res.status(404).json({ msg: not }); }
  });
});

// exports
module.exports = router;

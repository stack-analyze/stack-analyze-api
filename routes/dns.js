// modules
const whois = require('whois');
const { Router } = require('express');

// initial
const router = Router()

// route
router.get('/', (req, res) => {
  
  whois.lookup(url, (err, data) => {
    const { url } = req.query;
    
    if(url !== '') {
     const domain = data.split('\r\n').slice(0, 8);
     res.status(200).json( domain );
    } else { res.status(500).json({ msg: err.message }); }
  });
});

// exports
module.exports = router;

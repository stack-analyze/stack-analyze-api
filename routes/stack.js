// modules
const Wappalyzer = require('wappalyzer');
const { Router } = require('express');

// initial
const router = Router();

// route
router.get('/', async (req, res) => {
  const wappalyzer = await new Wappalyzer();

  // query param
  const { url } = req.query;

  if (url.indexOf("http") > -1) {
    try {
      await wappalyzer.init();

      const { technologies } = await wappalyzer.open(url).analyze();

      technologies[0] !== undefined
        ? res.status(200 || 304).json(technologies) 
        : res.status(200 || 304).json({technologies: 'not stack found'});
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }

    await wappalyzer.destroy();
  } else {
    res.status(404).json({ msg: 'not url found' });
  }
});

// exports
module.exports = router;

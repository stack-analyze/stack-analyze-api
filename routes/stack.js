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

// exports
module.exports = router;

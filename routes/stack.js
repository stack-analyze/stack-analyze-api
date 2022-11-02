// modules
import Wappalyzer from 'wappalyzer';
import { Router } from 'express';

// initial
const router = Router();

// route
router.get('/', async (req, res) => {
  // http regexp
  const webValidation = /https?:\/\//g;

  const wappalyzer = await new Wappalyzer();

  // url
  const { url } = req.query;

  if (!webValidation.test(url)) {
    return res.status(404).json({ msg: 'Please http:// or https:// is required' });
  }

  try {
    await wappalyzer.init();

    const { technologies } = await wappalyzer.open(url).analyze();

    const stackResults = technologies.map(({
      slug,
      name,
      icon,
      website,
      categories
    }) => {
      const stackCategories = categories.map(({ name }) => name);

      return {
        id: slug,
        name,
        icon,
        website,
        techCategories: stackCategories
      };
    });

    stackResults.length !== 0
      ? res.status(200 || 304).json(stackResults)
      : res.status(200 || 304).json({ stackResults: 'not stack found' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }

  await wappalyzer.destroy();
});

// exports
export default router;

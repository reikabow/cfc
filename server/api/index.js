const router = require('express').Router();

const SearchController = require('./v1/controllers/SearchController');
const CardController = require('./v1/controllers/CardController');

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
router.use('/search', SearchController.router);
router.use('/cards', CardController.router);

module.exports = router;

const router = require('express').Router();

const { SearchController } = require('./v1/controllers/');

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
router.use('/search', SearchController.router);

module.exports = router;

const router = require('express').Router();
const search = require('./search/');
const cards = require('./cards/');

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
router.use('/search', search);
router.use('/cards', cards);

module.exports = router;

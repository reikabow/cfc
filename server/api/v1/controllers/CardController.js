const bodyParser = require('body-parser');
const router = require('express').Router();
const pool = require('../../database');
const CardService = require('../services/CardService')(pool);

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch((err) => {
        console.log(err);
        next();
      });
  };

router.use(bodyParser.json());

router.use((err, req, res, next) => {
  res.status(500).send(err);
});

router.get('/', asyncMiddleware(async (req, res) => {
  res.json(await CardService.getFromSet(req.query.set));
}));

router.post('/', asyncMiddleware(async (req, res) => {
  await CardService.create(req.body);
  res.send();
}));

router.delete('/:cardId', asyncMiddleware(async (req, res) => {
  await CardService.delete(req.params.cardId);
  res.send();
}));

module.exports.router = router;

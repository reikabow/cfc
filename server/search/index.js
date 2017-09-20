const bodyParser = require('body-parser');
const express = require('express');

const api = require('./api');

const router = express.Router();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch((err) => {
        console.log(err);
        next();
      });
  };

router.use(bodyParser.urlencoded({ extended: false }));

router.use((err, req, res, next) => {
  res.status(500).send(err);
});

router.get('/health', (req, res) => {
  res.json({ status: 'good' });
});

router.get('/simplified', asyncMiddleware(async (req, res, next) => {
  res.json(await api.simplified(req.query.q));
}));

router.get('/traditional', asyncMiddleware(async (req, res, next) => {
  res.json(await api.traditional(req.query.q));
}));

router.get('/pinyin', asyncMiddleware(async (req, res, next) => {
  res.json(await api.pinyin(req.query.q));
}));

router.get('/definition', asyncMiddleware(async (req, res, next) => {
  res.json(await api.definition(req.query.q));
}));

module.exports = router;

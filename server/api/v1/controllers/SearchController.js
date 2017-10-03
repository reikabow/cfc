const bodyParser = require('body-parser');
const router = require('express').Router();
const pool = require('../../database');
const SearchController = require('../services/SearchService')(pool);

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

router.get('/simplified', asyncMiddleware(async (req, res) => {
  res.json(await SearchController.simplified(req.query.q));
}));

router.get('/traditional', asyncMiddleware(async (req, res) => {
  res.json(await SearchController.traditional(req.query.q));
}));

router.get('/pinyin', asyncMiddleware(async (req, res) => {
  res.json(await SearchController.pinyin(req.query.q));
}));

router.get('/definition', asyncMiddleware(async (req, res) => {
  res.json(await SearchController.definition(req.query.q));
}));

module.exports.router = router;

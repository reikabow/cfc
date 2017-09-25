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

router.post('/card', asyncMiddleware(async (req, res, next) => {
  await api.create(req.body.card);
}));

router.get('/card/:cardgroupId', asyncMiddleware(async (req, res, next) => {
  res.json(await api.getGroup(req.params.cardgroupId));
}));

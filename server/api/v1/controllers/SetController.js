const router = require('express').Router();
const bodyParser = require('body-parser');

const pool = require('../../database');
const SetService = require('../services/SetService')(pool);

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
  res.json(await SetService.getAll());
}));

router.post('/', asyncMiddleware(async (req, res) => {
  const { name } = req.body;
  await SetService.create(name);
  res.send();
}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const { setId } = req.body;
  await SetService.delete(setId);
  res.send();
}));

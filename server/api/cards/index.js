const router = require('express').Router();
const bodyParser = require('body-parser');
const api = require('./service');


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

router.post('/', asyncMiddleware(async (req, res, next) => {
  await api.create(req.body.card);
  res.send();
}));

// TODO: check if name is there are name collisions
router.put('/group/:groupName', asyncMiddleware(async (req, res, next) => {
  const response = await api.createGroup(req.params.groupName);
  res.json(response);
}));

router.get('/group/:cardgroupId', asyncMiddleware(async (req, res, next) => {
  const response = await api.getCardsFromGroup(req.params.cardgroupId);
  res.json(response.rows);
}));

module.exports = router;

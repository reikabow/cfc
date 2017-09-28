const express = require('express');
const cors = require('cors');
const api = require('./api/');

const app = express();

app.use(cors());
app.use('/api', api);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});

const express = require('express');
const cors = require('cors');

const search = require('./search');

const app = express();

app.use(cors());
app.use('/api/search', search);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});

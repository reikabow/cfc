const { Pool } = require('pg');

process.env.PGHOST = 'test_db';
const pool = new Pool({
  max: 1,
});

module.exports = pool;

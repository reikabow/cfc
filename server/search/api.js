const { Pool } = require('pg');

// PGHOST
// PGPORT
// PGDATABASE
process.env.PGDATABASE = 'chinesepractice';
// PGUSER
// PGPASSWORD
const pool = new Pool();

/**
 * Searches dictionary for matching simplified text
 * @param {string} needle - The text to search for
 * @return {???} - ???
 */
async function simplified(needle) {
  const rows = await pool.query(`
    SELECT id, simplified, traditional, pinyin, definition
    FROM dictionary
    WHERE simplified = $1`, [needle]);
  return rows;
}

async function traditional(needle) {
  const rows = await pool.query(`
    SELECT id, simplified, traditional, pinyinm definition
    FROM dictionary
    WHERE traditional = $1`, [needle]);
  return rows;
}

/**
 * Searches dictionary for matching Pinyin
 * needle is parsed to search for multiple intonations
 * @param {string} needle - The text to search for
 */
async function pinyin(needle) {
  const rows = await pool.query(`
    SELECT id, simplified, traditional, pinyin, definition
    FROM dictionary
    WHERE pinyin = $1`, [needle]);
  return rows;
}

async function definition(needle) {
  const rows = await pool.query(`
  SELECT id, simplified, traditional, pinyin, definition
  FROM dictionary
  WHERE definition = $1`, [needle]);
  return rows;
}

module.exports = {
  simplified,
  traditional,
  pinyin,
  definition,
};

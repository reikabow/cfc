const { Pool } = require('pg');

process.env.PGDATABASE = 'chinesepractice';

const pool = new Pool();

async function create(card) {
  const unpacked = [card.simplified, card.cardgroupId, card.traditional,
    card.pinyin, card.definition];
  await pool.query(`
    INSERT INTO cards (cardgroup_id, simplified, traditional, pinyin, definition)
    VALUES ($1, $2, $3, $4)`, unpacked);
}

async function getGroup(cardgroupId) {
  const rows = await pool.query(`
    SELECT id, simplified, traditional, pinyin, definition
    FROM cards
    WHERE cardgroup_id = $1`, [cardgroupId]);
  return rows;
}

module.exports = {
  create,
  getGroup,
};

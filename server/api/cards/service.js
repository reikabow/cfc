const pool = require('../database');

async function create(card) {
  const unpacked = [card.cardgroupId, card.simplified, card.traditional,
    card.pinyin, card.definition];
  await pool.query(`
    INSERT INTO card (cardgroup_id, simplified, traditional, pinyin, definition)
    VALUES ($1, $2, $3, $4, $5)`, unpacked);
}

async function createGroup(name) {
  await pool.query(`
    INSERT INTO cardgroup (name) VALUES ($1)`, [name]);
  const response = await pool.query(`
    SELECT id, name FROM cardgroup WHERE name = $1`, [name]);
  return response.rows;
}

async function getCardsFromGroup(groupId) {
  const rows = await pool.query(`
    SELECT id, simplified, traditional, pinyin, definition
    FROM card
    WHERE cardgroup_id = $1`, [groupId]);
  return rows;
}

module.exports = {
  create,
  createGroup,
  getCardsFromGroup,
};

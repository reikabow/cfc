const pool = require('../database');

<<<<<<< HEAD
async function createCard(card) {
  const unpacked = [card.groupId, card.simplified, card.traditional,
=======
async function create(card) {
  const unpacked = [card.cardgroupId, card.simplified, card.traditional,
>>>>>>> 4fde634952655c0a70c9175c1b6cb6317f0b1688
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

<<<<<<< HEAD
async function getCards() {
  const { rows } = await pool.query(`
    SELECT * FROM card`);
  return rows;
}

=======
>>>>>>> 4fde634952655c0a70c9175c1b6cb6317f0b1688
async function getCardsFromGroup(groupId) {
  const rows = await pool.query(`
    SELECT id, simplified, traditional, pinyin, definition
    FROM card
    WHERE cardgroup_id = $1`, [groupId]);
  return rows;
}

module.exports = {
<<<<<<< HEAD
  createCard,
  createGroup,
  getCards,
=======
  create,
  createGroup,
>>>>>>> 4fde634952655c0a70c9175c1b6cb6317f0b1688
  getCardsFromGroup,
};

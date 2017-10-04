module.exports = pool => ({
  create: async (card) => {
    const {
      setId,
      simplified,
      traditional,
      pinyin,
      definition,
    } = card;
    await pool.query(`
      INSERT INTO cards
      (set_id, simplified, traditional, pinyin, definition)
      VALUES
      ($1, $2, $3, $4, $5)`, [setId, simplified, traditional, pinyin, definition]);
  },

  delete: async (cardId) => {
    await pool.query(`
      DELETE FROM cards WHERE id = $1`, [cardId]);
  },

  getFromSet: async (setId) => {
    const { rows } = await pool.query(`
      SELECT id, set_id as "setId", simplified, traditional, pinyin, definition
      FROM cards
      WHERE set_id = $1`, [setId]);
    return rows;
  },
});

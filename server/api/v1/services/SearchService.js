module.exports = pool => ({
  /**
   * Searches dictionary for matching simplified text
   * @param {string} needle - The text to search for
   * @return {???} - ???
   */
  simplified: async function simplified(needle) {
    const { rows } = await pool.query(`
      SELECT id, simplified, traditional, pinyin, definition
      FROM terms
      WHERE simplified = $1`, [needle]);
    return rows;
  },

  traditional: async function traditional(needle) {
    const { rows } = await pool.query(`
      SELECT id, simplified, traditional, pinyinm definition
      FROM terms
      WHERE traditional = $1`, [needle]);
    return rows;
  },

  /**
   * Searches dictionary for matching Pinyin
   * needle is parsed to search for multiple intonations
   * @param {string} needle - The text to search for
   */
  pinyin: async function pinyin(needle) {
    const { rows } = await pool.query(`
      SELECT id, simplified, traditional, pinyin, definition
      FROM terms
      WHERE pinyin = $1`, [needle]);
    return rows;
  },

  definition: async function definition(needle) {
    const { rows } = await pool.query(`
    SELECT id, simplified, traditional, pinyin, definition
    FROM terms
    WHERE definition = $1`, [needle]);
    return rows;
  },
});

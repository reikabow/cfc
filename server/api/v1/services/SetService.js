module.exports = pool => ({
  getAll: async () => {
    const { rows } = await pool.query('SELECT id, name FROM sets');
    return rows;
  },

  create: async (name) => {
    await pool.query('INSERT INTO sets (name) VALUES ($1)', [name]);
  },

  delete: async (setId) => {
    await pool.query('DELETE FROM cards WHERE set_id = $1', [setId]);
    await pool.query('DELETE FROM sets WHERE id = $1', [setId]);
  },
});

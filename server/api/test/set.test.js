const pool = require('./database');
const CardService = require('../v1/services/CardService')(pool);
const SetService = require('../v1/services/SetService')(pool);

afterAll(() => pool.end());

describe('SetService.getAll', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM cards');
    await pool.query('DELETE FROM sets');
    await pool.query('INSERT INTO sets (name) VALUES ' +
      '($1), ($2), ($3), ($4), ($5)', ['a', 'b', 'c', 'd', 'e']);
  });

  it('should work', async () => {
    const sets = await SetService.getAll();
    expect(sets).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'a' }),
      expect.objectContaining({ name: 'b' }),
      expect.objectContaining({ name: 'c' }),
      expect.objectContaining({ name: 'd' }),
      expect.objectContaining({ name: 'e' }),
    ]));
  });
});

describe('SetService.create', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM cards');
    await pool.query('DELETE FROM sets');
  });

  it('should work', async () => {
    await SetService.create('example');
    await SetService.create('something');
    await SetService.create('foo');
    const sets = await SetService.getAll();
    expect(sets).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'example' }),
      expect.objectContaining({ name: 'something' }),
      expect.objectContaining({ name: 'foo' }),
    ]));
  });
});

describe('SetService.delete', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM cards');
    await pool.query('DELETE FROM sets');
    await pool.query('INSERT INTO sets (id, name) VALUES ($1, $2)', [1, 'foo']);
    await pool.query('INSERT INTO cards (set_id, pinyin) VALUES ' +
      '(1, $1), (1, $2), (1, $3)', ['foo', 'bar', 'zoo']);
  });

  it('should delete all cards in set', async () => {
    await SetService.delete(1);
    expect(await CardService.getFromSet(1)).toHaveLength(0);
  });

  it('should delete the set', async () => {
    await SetService.delete(1);
    const sets = await SetService.getAll();
    expect(sets).toHaveLength(0);
  });
});

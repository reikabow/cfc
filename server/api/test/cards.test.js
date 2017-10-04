const pool = require('./database.js');
const CardService = require('../v1/services/CardService')(pool);

afterAll(() => pool.end());

describe('CardService.create', () => {
  beforeEach(() => {
    pool.query('DELETE FROM cards');
    pool.query('DELETE FROM sets');
    pool.query('INSERT INTO sets (id) VALUES ($1)', [1]);
  });

  it('should work', async () => {
    await CardService.create({
      setId: 1,
      traditional: '好',
      simplified: '好',
      pinyin: 'hao3',
      definition: 'good',
    });
    await CardService.create({
      setId: 1,
      traditional: '不',
      simplified: '不',
      pinyin: 'bu4',
      definition: 'not',
    });
    const rows = await CardService.getFromSet(1);
    expect(rows).toEqual(expect.arrayContaining([
      expect.objectContaining({
        setId: 1,
        traditional: '好',
        simplified: '好',
        pinyin: 'hao3',
        definition: 'good',
      }),
      expect.objectContaining({
        setId: 1,
        traditional: '不',
        simplified: '不',
        pinyin: 'bu4',
        definition: 'not',
      }),
    ]));
  });
});

describe('CardService.delete', () => {
  beforeEach(() => {
    pool.query('DELETE FROM cards');
    pool.query('DELETE FROM sets');
    pool.query('INSERT INTO sets (id) VALUES ($1)', [1]);
    pool.query('INSERT INTO cards (id, set_id, pinyin) VALUES (1, 1, $1)', ['lai2']);
  });

  it('should work', async () => {
    await CardService.delete(1);
    const rows = await CardService.getFromSet(1);
    expect(rows).toHaveLength(0);
  });
});

describe('CardService.getFromSet', () => {
  beforeEach(() => {
    pool.query('DELETE FROM cards');
    pool.query('DELETE FROM sets');
    pool.query('INSERT INTO sets (id) VALUES ($1)', [1]);
    pool.query('INSERT INTO cards (set_id, pinyin) VALUES ($1, $2)', [1, 'hao3']);
    pool.query('INSERT INTO cards (set_id, pinyin) VALUES ($1, $2)', [1, 'bu4']);
    pool.query('INSERT INTO cards (set_id, pinyin) VALUES ($1, $2)', [1, 'lai2']);
  });

  it('should work', async () => {
    const rows = await CardService.getFromSet(1);
    expect(rows).toEqual(expect.arrayContaining([
      expect.objectContaining({
        setId: 1,
        pinyin: 'hao3',
      }),
      expect.objectContaining({
        setId: 1,
        pinyin: 'bu4',
      }),
      expect.objectContaining({
        setId: 1,
        pinyin: 'lai2',
      }),
    ]));
  });
});

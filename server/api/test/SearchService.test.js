const pool = require('./database.js');
const SearchService = require('../v1/services/SearchService')(pool);

afterAll(() => pool.end());

describe('SearchService.pinyin', () => {
  beforeEach(() => {
    pool.query('DELETE FROM terms');
    pool.query('INSERT INTO terms (pinyin) VALUES ($1)', ['ma1']);
    pool.query('INSERT INTO terms (pinyin) VALUES ($1)', ['lai2']);
    pool.query('INSERT INTO terms (pinyin) VALUES ($1)', ['hao3']);
    pool.query('INSERT INTO terms (pinyin) VALUES ($1)', ['bu4']);
  });

  it('should work', async () => {
    const rows = await SearchService.pinyin('hao3');
    expect(rows.length).toBe(1);
  });

  it('should also work', async () => {
    const rows = await SearchService.pinyin('nope');
    expect(rows.length).toBe(0);
  });
});

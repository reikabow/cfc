const Promise = require('bluebird');
const { Pool } = require('pg');

const readFile = Promise.promisify(require('fs').readFile);

const DICT_PATH = './cedict_1_0_ts_utf-8_mdbg.txt';
const N_HEADER = 30;

process.env.PGDATABASE = 'chinesepractice';

const pool = new Pool();

readFile(DICT_PATH, 'utf8')
  .then(data => data.split('\n').splice(N_HEADER))
  .then((data) => {
    const regPattern = /(.*)\s(.*)\s\[(.*)\]\s\/(.*)\//;
    return data.map(regPattern.exec.bind(regPattern));
  })
  .then(data => data.map(row => [...row.splice(1)]))
  .then((rows) => {
    const promises = rows.map((row, id) => pool.query(`INSERT INTO
    dictionary (id, traditional, simplified, pinyin, definition)
    VALUES($1, $2, $3, $4, $5)`, [id, ...row]));
    return Promise.all(promises);
  })
  .then(() => {
    console.log('Completed...');
  })
  .catch(console.error);

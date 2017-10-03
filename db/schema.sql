DROP TABLE IF EXISTS terms;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS sets;

CREATE TABLE terms (
  id SERIAL PRIMARY KEY,
  simplified TEXT,
  traditional TEXT,
  pinyin TEXT,
  definition TEXT
);

CREATE TABLE sets (
  id SERIAL PRIMARY KEY,
  name TEXT,
  created DATE
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  set_id INTEGER REFERENCES sets(id),
  simplified TEXT,
  traditional TEXT,
  pinyin TEXT,
  definition TEXT
);

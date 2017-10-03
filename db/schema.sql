DROP TABLE IF EXISTS dictionary;
DROP TABLE IF EXISTS cardgroup;
DROP TABLE IF EXISTS card;

CREATE TABLE dictionary (
  id SERIAL PRIMARY KEY,
  simplified TEXT,
  traditional TEXT,
  pinyin TEXT,
  definition TEXT
);

CREATE TABLE cardgroup (
  id SERIAL PRIMARY KEY,
  name TEXT,
  created DATE
);

CREATE TABLE card (
  id SERIAL PRIMARY KEY,
  cardgroup_id INTEGER REFERENCES cardgroup(id),
  simplified TEXT,
  traditional TEXT,
  pinyin TEXT,
  definition TEXT
);

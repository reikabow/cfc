#!/bin/bash

cat cedict_1_0_ts_utf-8_mdbg.txt |
  sed -r "s/(.*)[[:space:]](.*)[[:space:]]\[(.*)\][[:space:]]\/(.*)\//\
INSERT INTO terms (simplified, traditional, pinyin, definition) VALUES (\$$\1\$$,\$$\2\$$,\$$\3\$$,\$$\4\$$);/;tx;d;:x"
  
#!/bin/bash

#!/bin/bash

cat entries.txt |
  sed -r "s/(.*)[[:space:]](.*)[[:space:]]\[(.*)\][[:space:]]\/(.*)\//\
INSERT INTO terms (simplified, traditional, pinyin, definition) VALUES (\$$\1\$$,\$$\2\$$,\$$\3\$$,\$$\4\$$);/;tx;d;:x"
  
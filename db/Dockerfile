FROM postgres:9.4

COPY schema.sql /docker-entrypoint-initdb.d/

COPY . /code
WORKDIR /code

# Named zdump.sql for ordering purposes hhhh
RUN /bin/bash init.sh >zdump.sql
RUN mv zdump.sql /docker-entrypoint-initdb.d/

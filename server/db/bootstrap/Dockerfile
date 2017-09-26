FROM node:alpine

# For index.js
ENV PGUSER chineseflashcards
ENV PGPASSWORD apple1
ENV PGHOST db
ENV PGPORT 5432

COPY . /code
WORKDIR /code

RUN apk add bash

RUN npm install --silent

RUN chmod +x ./wait-for-it.sh

CMD ["./wait-for-it.sh", "db:5432", "-t", "60", "--", "node", "index"]
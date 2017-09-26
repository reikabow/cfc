FROM node:alpine

WORKDIR /code

RUN npm install -g --silent nodemon
COPY package.json package-lock.json /code/
RUN npm install --silent

COPY db/bootstrap /bootstrap
WORKDIR /bootstrap
RUN npm install --silent && node index
WORKDIR /code

EXPOSE 3001

CMD ["nodemon", "index"]
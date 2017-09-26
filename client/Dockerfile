FROM node:alpine

WORKDIR /code
COPY package.json yarn.lock /code/
RUN npm install -g --silent yarn && yarn install --silent

EXPOSE 3000

CMD ["yarn", "start"]
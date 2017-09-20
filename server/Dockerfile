FROM node:latest

COPY . /code
WORKDIR /code

RUN npm install
RUN npm install -g nodemon

ENV PORT 8000
EXPOSE 8000

CMD ["nodemon", "index"]
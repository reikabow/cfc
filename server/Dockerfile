FROM node:latest

WORKDIR /code

RUN npm install -g --silent nodemon
# COPY package.json package-lock.json /code/
# RUN npm install --silent

EXPOSE 3001

CMD ["/bin/bash", "docker_entry.sh"]
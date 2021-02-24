FROM node:erbium

# Install softwares
RUN apt-get update  && \
  apt-get install -y build-essential

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install
RUN npm install pm2 -g

# Bundle app source
COPY . /usr/src/app

EXPOSE 10010

CMD [ "pm2-docker", "processes.json" ]
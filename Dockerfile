FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install

EXPOSE 4243

CMD [ "npm", "run", "dev" ]




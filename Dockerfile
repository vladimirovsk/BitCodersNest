FROM node:18.16.0 As build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm ci --only=production && npm cache clean --force

COPY  . .

RUN npm run build

EXPOSE 27017

FROM node:18.16.0 As build

WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm ci --only=production && npm cache clean --force
RUN npm install

COPY  . .

RUN npm run build

EXPOSE 27017

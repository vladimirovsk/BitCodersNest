FROM node:16.8.0-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY  . .

RUN npm run build

#COPY /dist /dist

CMD ["node", "./dist/apps/rest/main.js"]
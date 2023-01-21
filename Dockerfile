FROM node:16.8.0-alpine As build

WORKDIR /dist

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force
#RUN npm install --legacy-peer-deps

COPY  . .

RUN npm run build

#CMD ["node", "./dist/apps/rest/main.js"]
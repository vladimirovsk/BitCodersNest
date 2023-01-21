FROM node:16.8.0-alpine
WORKDIR /
ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install
#RUN npm ci
ADD . .
RUN npm cache clean --force
RUN npm install

RUN npm prune --production
#RUN npm run build

#CMD ["node", "./dist/apps/rest/main.js"]
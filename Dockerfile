FROM node:14-alpine
WORKDIR /
ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install
#RUN npm ci
ADD . .
RUN npm run build
RUN npm prune - -production
CMD ["node", "./dist/apps/rest/main.js"]
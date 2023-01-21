FROM node:16.8.0-alpine
WORKDIR /opt/app
ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install
#RUN npm ci
ADD . .
#RUN npm run build
#RUN npm prune - -production
#CMD ["node", "./dist/main.js"]
FROM node:20-alpine As build

RUN apk update && apk upgrade --no-cache

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine As production

RUN apk update && apk upgrade --no-cache

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3025

CMD ["node", "dist/main"]
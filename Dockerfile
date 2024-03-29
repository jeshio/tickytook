FROM node:11.1.0-alpine AS node_base

FROM node_base as deps
WORKDIR /usr/app
COPY package.json /usr/app/package.json
COPY yarn.lock /usr/app/yarn.lock
RUN yarn install

FROM node_base as build
WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules /usr/app/node_modules
COPY . /usr/app

RUN yarn build

# для копированяи sitemap сгенерированного предыдущей командой
COPY . /usr/app

EXPOSE 80
CMD ["yarn", "start:prod"]


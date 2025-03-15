ARG NODE_VERSION=22

FROM node:${NODE_VERSION} as base

WORKDIR /app

EXPOSE 5000

# Dev stage
FROM base as dev

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]

# Prod stage
FROM base as prod

COPY package.json .

# For linux users
RUN apk add --no-cache \
    build-base \
    python3 \
    vips-dev

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
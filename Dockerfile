ARG NODE_VERSION=lts

# Dependencies
FROM node:${NODE_VERSION}-slim as dependencies
WORKDIR /home/node/

RUN apt-get update
RUN apt-get install -y build-essential python
RUN npm install --global npm node-gyp

COPY package.json *package-lock.json *.npmrc ./

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
RUN npm ci

# Application
FROM node:${NODE_VERSION}-slim as build
WORKDIR /home/node/

COPY --from=dependencies /home/node/node_modules node_modules
COPY . .

ENV PATH="$PATH:/home/node/node_modules/.bin"
ENV NODE_ENV production

###
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    --no-install-recommends
# Install Google Chrome
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get -yqq update && \
    apt-get -yqq install google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

RUN npm run build

# Nginx
FROM nginx:1.16

COPY --from=build /home/node/build /var/www
COPY conf.nginx /etc/nginx/conf.d/default.conf
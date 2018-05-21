FROM node:8

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -yq libgconf-2-4 && \
    apt-get install -y wget --no-install-recommends && \
    apt-get install -y google-chrome-unstable --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY yarn.lock package.json ./

RUN mkdir -p docs test packages/gestalt
COPY packages/gestalt/package.json ./packages/gestalt/
COPY docs/package.json ./docs/
COPY test/package.json ./test/

RUN yarn install --pure-lockfile --ignore-scripts

COPY . ./

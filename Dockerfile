FROM node:8

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV DISPLAY :99

COPY test/xvfb_init /etc/init.d/xvfb
COPY test/xvfb_daemon_run /usr/bin/xvfb-daemon-run

COPY yarn.lock package.json ./

RUN mkdir -p docs test packages/gestalt
COPY packages/gestalt/package.json ./packages/gestalt/
COPY docs/package.json ./docs/
COPY test/package.json ./test/

RUN  apt-get update \
     && apt-get install -yq libgconf-2-4 \
     && apt-get install -y wget --no-install-recommends \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-unstable --no-install-recommends \
     && rm -rf /var/lib/apt/lists/* \
     && npm i puppeteer@1.4.0 \
     && apt-get install xvfb firefox-esr -yy -qq \
     && chmod a+x /etc/init.d/xvfb /usr/bin/xvfb-daemon-run


RUN yarn install --pure-lockfile --ignore-scripts

COPY . ./

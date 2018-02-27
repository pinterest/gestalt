FROM node:8

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV DISPLAY :99

COPY test/xvfb_init /etc/init.d/xvfb
COPY test/xvfb_daemon_run /usr/bin/xvfb-daemon-run

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -yy -qq && \
    apt-get install yarn=v1.5.1 -yy -qq && \
    apt-get install xvfb firefox-esr -yy -qq && \
    chmod a+x /etc/init.d/xvfb /usr/bin/xvfb-daemon-run

RUN mkdir -p packages/gestalt

COPY yarn.lock \
     package.json \
     ./
COPY packages/gestalt/package.json \
     ./packages/gestalt/

RUN yarn install --pure-lockfile --ignore-scripts

COPY . ./

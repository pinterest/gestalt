FROM node:8

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV DISPLAY :99

COPY test/xvfb_init /etc/init.d/xvfb
COPY test/xvfb_daemon_run /usr/bin/xvfb-daemon-run

RUN apt-get update && apt-get install -y curl xvfb chromium

ADD xvfb-chromium /usr/bin/xvfb-chromium
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser

COPY yarn.lock package.json ./

RUN mkdir -p docs test packages/gestalt
COPY packages/gestalt/package.json ./packages/gestalt/
COPY docs/package.json ./docs/
COPY test/package.json ./test/

RUN yarn install --pure-lockfile --ignore-scripts

COPY . ./

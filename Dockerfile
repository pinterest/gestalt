FROM node:8

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV DISPLAY :99

ADD test/xvfb_init /etc/init.d/xvfb
ADD test/xvfb_daemon_run /usr/bin/xvfb-daemon-run

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -yy -qq && \
    apt-get install yarn xvfb -yy -qq && \
    apt-get install firefox-esr -yy -qq && \
    chmod a+x /etc/init.d/xvfb /usr/bin/xvfb-daemon-run

ADD ./**/package.json ./yarn.lock ./

RUN ls -lah . packages/*/

RUN yarn --pure-lockfile --ignore-scripts

ADD . /app

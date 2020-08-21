// @flow strict
module.exports = {
  server: {
    command: `yarn start:no-watch`,
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
  launch: {
    headless: true,
    devtools: false,
    defaultViewport: {
      width: 2000,
      height: 15000,
    },
  },
  browserContext: 'incognito',
};

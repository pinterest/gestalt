module.exports = {
  launch: process.env.BUILDKITE
    ? {
        headless: true,
        executablePath: 'google-chrome-unstable',
        args: [
          // Required for Docker version of Puppeteer	    launchTimeout: 30000,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          // This will write shared memory files into /tmp instead of /dev/shm,
          // because Docker’s default for /dev/shm is 64MB
          '--disable-dev-shm-usage',
        ],
      }
    : {
        headless: true,
      },
  server: {
    command: './scripts/integration_server.sh',
    port: 3001,
    debug: true,
    launchTimeout: 30000,
  },
};

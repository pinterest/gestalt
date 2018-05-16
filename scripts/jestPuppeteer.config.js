module.exports = {
  launch: {
    headless: true,
    ...(process.env.BUILDKITE_REPO
      ? { executablePath: 'google-chrome-unstable' }
      : {}),
    args: process.env.BUILDKITE_REPO
      ? [
          // Required for Docker version of Puppeteer
          '--no-sandbox',
          '--disable-setuid-sandbox',
          // This will write shared memory files into /tmp instead of /dev/shm,
          // because Docker’s default for /dev/shm is 64MB
          '--disable-dev-shm-usage',
        ]
      : [],
  },
};

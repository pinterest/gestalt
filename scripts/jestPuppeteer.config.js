module.exports = {
  launch: {
    headless: true,
    args: process.env.CI
      ? [
          // Required for Docker version of Puppeteer
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ]
      : [],
  },
};

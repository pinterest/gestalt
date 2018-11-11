module.exports = {
  launch: {
    headless: true,
  },
  server: {
    command: './scripts/integration_server.sh',
    port: 3001,
    debug: true,
    launchTimeout: 30000,
  },
};

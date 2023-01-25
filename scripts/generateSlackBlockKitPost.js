#!/usr/bin/env node
import blogPosts from './BlogPosts.json';

require('@babel/register');

const chalk = require('chalk');

function logSuccess(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.green(`✅ ${message}`));
}
(async function generateSlackBlockKitPost() {
  logSuccess(blogPosts[0]);
})();

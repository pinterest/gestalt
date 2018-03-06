#!/usr/bin/env node
/* eslint import/no-dynamic-require: 0, no-console: 0 */
const path = require('path');
const shell = require('shelljs');

const json = require(path.join(
  __dirname,
  '..',
  'packages',
  'gestalt',
  'package.json'
));
const { version } = json;
console.log('publishing version ', version);

shell.exec('yarn publish --registry=https://registry.npmjs.org');
shell.exec(`git tag v${version}`);
shell.exec(`git push upstream tags/v${version}`);
shell.exec('./scripts/ghpages.sh');

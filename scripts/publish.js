#!/usr/bin/env node
/* eslint import/no-dynamic-require: 0, no-console: 0 */
const path = require('path');
const shell = require('shelljs');

const json = require(path.join(process.cwd(), 'package.json'));
const { version } = json;
console.log('publishing version ', version);

shell.exec('npm publish --registry=https://registry.npmjs.org');
shell.exec(`git tag v${version}`);
shell.exec(`git push upstream tags/v${version}`);
// Disable publishing the docs until Gestalt is open source
// shell.exec('./scripts/ghpages.sh');

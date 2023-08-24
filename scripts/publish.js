#!/usr/bin/env node
/* eslint import/no-dynamic-require: 0, no-console: 0 */
const path = require('path');
const shell = require('shelljs');

const json = require(path.join(__dirname, '..', 'packages', 'gestalt', 'package.json'));
const { version } = json;
console.log(`Publishing version: ${version}`);

// Publish command to post to npm - must be run in the same directory as the gestalt package
// `yarn publish` publishes the package defined by the package.json in the current directory.
// The order of these packages is important!
// The gestalt package depends on the tokens package, so that must be listed first.
const packages = [
  'gestalt-design-tokens',
  'gestalt',
  'gestalt-charts',
  'gestalt-datepicker',
  'eslint-plugin-gestalt',
];

packages.forEach((packageName) => {
  shell.cd(path.join(__dirname, '..', 'packages', packageName));
  shell.exec(
    `yarn publish --registry=https://registry.npmjs.org --no-git-tag-version --new-version ${version}`,
  );
});

// Creates a new tag on GitHub for record keeping
shell.exec(`git tag v${version}`);
shell.exec(`git push upstream tags/v${version}`);

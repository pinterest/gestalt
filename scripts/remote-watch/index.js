#!/usr/bin/env node
const colors = require('colors/safe');
const yargs = require('yargs');
const watch = require('./watch.js');

const nodeDebugger = require('./debugger.js');

const usage = `Transfer files to a remote server. 
Usage: $0 --root . --remote \${USER}@devapp:~/code/pinboard/`;
const options = yargs
  .usage(usage)
  .describe('root', 'the watchman root directory (probably `~/code/pinboard/`)')
  .demand('root')
  // eslint-disable-next-line no-template-curly-in-string
  .describe('remote', 'the remote host (probably `${USER}@devapp:~/code/pinboard/`)')
  .demand('remote')
  .boolean('self-restart')
  .default('self-restart', true)
  .boolean('with-webapp-debugger')
  .default('with-webapp-debugger', false)
  .boolean('sync-locale-data')
  .default('sync-locale-data', true)
  .help().argv;

if (options.selfRestart === false) {
  console.log('Self-restart is disabled');
}

// args that are specified multiple times are passed in as arrays.
// this happens when users pass in custom args to override the default
// values with something like
// `yarn watchman-sync --root ~/path/to/default --root ~/path/to/override`
// So we take the last arg specified.
const root = Array.isArray(options.root) ? options.root.slice(-1)[0] : options.root;
const remote = Array.isArray(options.remote) ? options.remote.slice(-1)[0] : options.remote;

try {
  if (options.withWebappDebugger) {
    console.log('Starting webapp debugger...');
    nodeDebugger();
  }
  watch(root, remote, options.selfRestart, options.syncLocaleData);
} catch (e) {
  console.error(colors.red('Watch error'));
  console.log(e);

  process.exitCode = 0;
}

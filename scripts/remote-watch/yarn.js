// @flow
// $FlowFixMe[untyped-import]
const colors = require('colors/safe');
const { exec } = require('child_process');
const fs = require('fs');
const setTerminalTitle = require('./setTerminalTitle.js');

const lastYarnLockMtime = fs.statSync('./yarn.lock').mtime;

// eslint-disable-next-line no-unused-vars
function yarn(root /*: string */, remote /*: string */, file /*: string */) {
  console.log('[yarn.lock] yarning');
  // eslint-disable-next-line no-unused-vars
  exec('yarn', (error, stdout, stderr) => {
    if (error) {
      console.error(colors.red(error));
      setTerminalTitle('yarn error ❌');
      return;
    }
    console.log(stdout);
    console.log('[yarn.lock] success');

    const nextYarnLockMtime = fs.statSync('./yarn.lock').mtime;
    if (String(lastYarnLockMtime) !== String(nextYarnLockMtime)) {
      console.log(
        colors.blue('Your are running an older version of the Pinterest devtools. Restarting...'),
      );
      process.exit(0);
    }
  });
}

module.exports = yarn;

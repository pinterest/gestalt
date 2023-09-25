// @flow
// $FlowFixMe[untyped-import]
const colors = require('colors/safe');
const { exec } = require('child_process');
const setTerminalTitle = require('./setTerminalTitle.js');

function syncFile(root /*: string */, remote /*: string */, file /*: string */) {
  const date = new Date();
  const cmd = `rsync --compress --relative --exclude-from=${__dirname}/excludes.txt ${root}./${file} ${remote}`;

  setTerminalTitle('Syncing...');
  // eslint-disable-next-line no-unused-vars
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(colors.red(error));
      setTerminalTitle('Not synced ❌');
      return;
    }
    const current = new Date();
    const elapsed = current.getTime() - date.getTime();
    const currentTime = `${current.getHours()}:${current.getMinutes().toString().padStart(2, '0')}`;
    console.log(`[synced]  ${file} at ${currentTime} (${elapsed}ms)`);
    setTerminalTitle('Synced ✅');
  });
}

module.exports = syncFile;

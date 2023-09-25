// @flow
// $FlowFixMe[untyped-import]
const colors = require('colors/safe');
const { spawn } = require('child_process');
const setTerminalTitle = require('./setTerminalTitle.js');

let rsync;

function syncAllFiles(src /*: string */, remote /*: string */) {
  const date = new Date();
  const args = ['--delete', '-az', `--exclude-from=${__dirname}/excludes.txt`, src, remote];
  setTerminalTitle('Syncing...');
  console.log('Performing full sync');

  // kill previously running full sync
  if (rsync) {
    rsync.kill();
  }

  rsync = spawn('rsync', args);
  if (rsync.stdout) {
    rsync.stdout.on('data', (data) => console.log(data.toString()));
    rsync.stdout.on('end', () => {
      const current = new Date();
      const elapsed = current.getTime() - date.getTime();
      const currentTime = `${current.getHours()}:${current
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      console.log(`Synced all files at ${currentTime} (${elapsed}ms)`);
      setTerminalTitle('Synced ✅');
    });
  }
  if (rsync.stderr) {
    rsync.stderr.on('data', (data) => console.error(colors.red(data)));
  }
  rsync.on('error', (error) => {
    console.error(colors.red(error));
    setTerminalTitle('Not synced ❌');
  });
  rsync.on('exit', (code) => {
    if (code !== 0) {
      console.error(`rsync exited with code ${code}`);
    }
  });
}

module.exports = syncAllFiles;

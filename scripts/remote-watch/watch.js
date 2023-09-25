const throttle = require('lodash/throttle');
const sane = require('sane');
const syncFile = require('./syncFile.js');
const syncAllFiles = require('./syncAllFiles.js');
const setTerminalTitle = require('./setTerminalTitle.js');
const yarn = require('./yarn.js');

const THROTTLE_NEXT_TICK_MS = 50;

// $FlowFixMe[signature-verification-failure]
module.exports = function (root, remote, selfRestart, syncLocaleData = true) {
  if (selfRestart) {
    const lockfileWatcher = sane(root, {
      glob: 'webapp/yarn.lock',
      watchman: true,
    });
    lockfileWatcher.on('ready', yarn);
    lockfileWatcher.on('change', yarn);
  }

  const ignoredDirectories = [
    '**/.idea/**/*',
    '.git/',
    '.idea/**/*',
    'build/**/*',
    'docs/*',
    'coverage/**/*',
    'webapp/output.json',
    'webapp/integration/output/**/*',
    /node_modules/,
  ];

  if (!syncLocaleData) {
    ignoredDirectories.push('webapp/locale/**');
  }

  const fileWatcher = sane(root, {
    glob: '**/*',
    watchman: true,
    dot: true,
    ignored: ignoredDirectories,
  });

  const filesChanged = [];
  const filesDeleted = [];

  // We don't want to create too many rsync processes,
  // so we throttle rsync invocations to 10x/sec.x
  const doSync = throttle((_root, _remote) => {
    if (filesChanged.length === 1) {
      syncFile(_root, _remote, filesChanged[0]);
    } else if (filesChanged.length > 1) {
      syncAllFiles(_root, _remote);
    } else {
      return;
    }
    filesChanged.length = 0;
  }, 100 /* ms */);

  const sync = () => {
    if (filesChanged.length) {
      filesChanged.forEach((file) => console.log(`[changed] ${file}`));
    }
    doSync(root, remote);
  };

  const syncDelete = () => {
    if (filesDeleted.length) {
      filesDeleted.forEach((file) => console.log(`[deleted] ${file}`));
    }
    if (filesDeleted.length >= 1) {
      syncAllFiles(root, remote);
      filesDeleted.length = 0;
    }
  };
  const nextTickSync = throttle(() => process.nextTick(sync), THROTTLE_NEXT_TICK_MS);
  const nextTickSyncDelete = throttle(() => process.nextTick(syncDelete), THROTTLE_NEXT_TICK_MS);

  fileWatcher.on('ready', () => {
    console.log('Starting to watch');
    syncAllFiles(root, remote);
  });
  // eslint-disable-next-line no-unused-vars
  fileWatcher.on('change', (filepath, _, stat) => {
    filesChanged.push(filepath);
    nextTickSync();
  });
  // eslint-disable-next-line no-unused-vars
  fileWatcher.on('add', (filepath, _, stat) => {
    filesChanged.push(filepath);
    nextTickSync();
  });
  // eslint-disable-next-line no-unused-vars
  fileWatcher.on('delete', (filepath, _) => {
    filesDeleted.push(filepath);
    nextTickSyncDelete();
  });
};

process.on('exit', () => {
  setTerminalTitle('❓ yarn dev not running');
});

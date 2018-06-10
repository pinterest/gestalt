// @flow

export default function lockfile() {
  const packageChanged = danger.git.modified_files.includes('package.json');
  const lockfileChanged = danger.git.modified_files.includes('yarn.lock');
  if (packageChanged && !lockfileChanged) {
    const title = ':lock: Lockfile';
    const message = 'Changes were made to package.json, but not to yarn.lock';
    warn(`${title} - <i>${message}</i>`);
  }
}

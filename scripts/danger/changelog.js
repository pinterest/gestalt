// @flow

export default function changelog() {
  const changelogUpdated = danger.git.modified_files.includes('CHANGELOG.md');
  if (!changelogUpdated) {
    const title = ':memo: CHANGELOG';
    const message = 'Please add a CHANGELOG.md entry for your changes';
    warn(`${title} - <i>${message}</i>`);
  }
}

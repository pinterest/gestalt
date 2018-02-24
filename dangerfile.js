// @flow
import { danger, warn } from 'danger';

if (!danger.git.modified_files.includes('CHANGELOG.md')) {
  warn(
    'Please add a [changelog.md](https://github.com/pinterest/gestalt/blob/master/CHANGELOG.md) entry for your changes.'
  );
}

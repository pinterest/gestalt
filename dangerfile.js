// @flow
import { danger, warn, schedule } from 'danger';
import yarn from 'danger-plugin-yarn';
import { istanbulCoverage } from 'danger-plugin-istanbul-coverage';
import spellcheck from 'danger-plugin-spellcheck';

if (!danger.git.modified_files.includes('CHANGELOG.md')) {
  warn(
    'Please add a [changelog.md](https://github.com/pinterest/gestalt/blob/master/CHANGELOG.md) entry for your changes.'
  );
}

yarn();

schedule(
  istanbulCoverage({
    entrySortMethod: 'uncovered-lines',
    reportFileSet: 'createdOrModified',
  })
);

// schedule(spellcheck());

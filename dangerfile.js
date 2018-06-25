// @flow

import bundlesize from './scripts/danger/bundlesize.js';
import changelog from './scripts/danger/changelog.js';
import lockfile from './scripts/danger/lockfile.js';

// Add a CHANGELOG entry for app changes
changelog();
// Keep lockfile up to date with package
lockfile();
// Bundle size alerting
bundlesize();

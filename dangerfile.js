// @flow

import bundlesize from './scripts/danger/bundlesize';
import changelog from './scripts/danger/changelog';
import lockfile from './scripts/danger/lockfile';

// Add a CHANGELOG entry for app changes
changelog();
// Keep lockfile up to date with package
lockfile();
// Bundle size alerting
bundlesize();

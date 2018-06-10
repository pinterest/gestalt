// @flow

import bundlesize from './danger/bundlesize';
import changelog from './danger/changelog';
import lockfile from './danger/lockfile';

// Add a CHANGELOG entry for app changes
changelog();
// Keep lockfile up to date with package
lockfile();
// Bundle size alerting
bundlesize();

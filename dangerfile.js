// @flow
import changelog from './scripts/danger/changelog.js';
import lockfile from './scripts/danger/lockfile.js';
import experiments from './scripts/danger/experiments.js';

// Add a CHANGELOG entry for app changes
changelog();
// Keep lockfile up to date with package
lockfile();
// Experimental reminders
experiments();

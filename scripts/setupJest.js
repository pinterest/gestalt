import '@testing-library/jest-dom/extend-expect.js';
// Prevents `ReferenceError: regeneratorRuntime is not defined Babel 6` error due to using async/await syntax.
// TODO: to be replaced with @babel/plugin-transform-runtime within babel.config.js
import 'regenerator-runtime/runtime';
import failOnConsole from 'jest-fail-on-console';
import { configure } from '@testing-library/react';

// Set up react testing library.
configure({ testIdAttribute: 'data-test-id' });

// Fail tests on `console` calls
failOnConsole({
  shouldFailOnLog: true,
});

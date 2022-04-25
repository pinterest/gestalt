import '@testing-library/jest-dom/extend-expect.js';
// Prevents `ReferenceError: regeneratorRuntime is not defined Babel 6` error due to using async/await syntax.
// TODO: to be replaced with @babel/plugin-transform-runtime within babel.config.js
import 'regenerator-runtime/runtime';

// Set up react testing library.
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });

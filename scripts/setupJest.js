import '@testing-library/jest-dom/extend-expect.js';

// Set up react testing library.
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });

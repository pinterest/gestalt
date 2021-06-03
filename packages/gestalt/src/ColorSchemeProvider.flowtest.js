// @flow strict
import ColorSchemeProvider from './contexts/ColorScheme.js';

const Valid = <ColorSchemeProvider>Test</ColorSchemeProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ColorSchemeProvider nonexisting={33} />;

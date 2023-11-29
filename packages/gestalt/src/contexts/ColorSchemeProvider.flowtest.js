// @flow strict
import ColorSchemeProvider from './ColorSchemeProvider';

const Valid = <ColorSchemeProvider>Test</ColorSchemeProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ColorSchemeProvider nonexisting={33} />;

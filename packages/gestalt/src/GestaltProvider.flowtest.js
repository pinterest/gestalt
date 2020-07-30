// @flow strict
import React from 'react';
import GestaltProvider from './GestaltProvider.js';

const Valid = <GestaltProvider>Test</GestaltProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <GestaltProvider nonexisting={33} />;

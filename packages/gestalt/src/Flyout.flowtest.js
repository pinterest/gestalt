// @flow strict
import React from 'react';
import Flyout from './Flyout.js';

const Valid = <Flyout anchor={document.createElement('div')} onDismiss={() => {}} />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Flyout nonexisting={33} />;

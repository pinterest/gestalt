// @flow strict
import React from 'react';
import ScrollableContainer from './ScrollableContainer.js';

const Valid = <ScrollableContainer />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <ScrollableContainer nonexisting={33} />;

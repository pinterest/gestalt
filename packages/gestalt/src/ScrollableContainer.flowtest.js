// @flow strict
import React from 'react';
import ScrollableContainer from './ScrollableContainer.js';
import Box from './Box.js';

const Valid = (
  <ScrollableContainer>
    <Box />
  </ScrollableContainer>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <ScrollableContainer nonexisting={33} />;

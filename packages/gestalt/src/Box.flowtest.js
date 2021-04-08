// @flow strict
import React from 'react';
import Box from './Box.js';

const Valid = <Box>Text</Box>;
const ValidAs = <Box margin={3} as="aside" />;

// $FlowExpectedError[incompatible-type]
const IncorrectMargin = <Box margin={33} />;

// $FlowExpectedError[incompatible-type]
const IncorrectAs = <Box margin={3} as="invalid" />;

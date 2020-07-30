// @flow strict
import React from 'react';
import Box from './Box.js';

const Valid = <Box>Text</Box>;

// $FlowExpectedError[incompatible-type] Cannot create `Box` element because  number [1] is incompatible with  enum [2] in property `margin.
const IncorrectMargin = <Box margin={33} />;

// @flow strict
import React from 'react';
import Stack from './Stack.js';

const ValidSingle = (
  <Stack gap={1}>
    <div />
  </Stack>
);

const ValidMultiple = (
  <Stack gap={1}>
    <div />
    <div />
    <div />
    <div />
  </Stack>
);

const test = true;
const Testing = <Stack>{test ? <div /> : null}</Stack>;

// $FlowExpectedError[incompatible-type]
const MissingProp = <Stack gap={1}>test</Stack>;

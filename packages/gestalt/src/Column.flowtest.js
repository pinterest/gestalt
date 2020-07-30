// @flow strict
import React from 'react';
import Column from './Column.js';

const Valid = <Column xs={1}>Hello world</Column>;

// $FlowExpectedError[incompatible-type]
const NonExistingProp = <Column nonexisting={33} />;

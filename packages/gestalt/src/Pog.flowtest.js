// @flow strict
import React from 'react';
import Pog from './Pog.js';

const Valid = <Pog icon="add" />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Pog nonexisting={33} />;

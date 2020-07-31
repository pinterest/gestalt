// @flow strict
import React from 'react';
import Divider from './Divider.js';

const Valid = <Divider />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Divider nonexisting={33} />;

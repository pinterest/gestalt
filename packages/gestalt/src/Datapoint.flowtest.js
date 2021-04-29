// @flow strict
import React from 'react';
import Datapoint from './Datapoint.js';

const Valid = (
  <Datapoint
    title="Title"
    value="1M"
    trend={{ value: 30, accessibilityLabel: 'Value change icon accessibility label' }}
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <Datapoint nonexisting={33} />;

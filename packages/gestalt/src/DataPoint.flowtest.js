// @flow strict
import React from 'react';
import Datapoint from './Datapoint.js';

const Valid = (
  <Datapoint
    percentChangeAccessibilityLabel="Value change icon accessibility label"
    title="Title"
    value="1M"
    percentChange={30}
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <Datapoint nonexisting={33} />;

// @flow strict
import React from 'react';
import DataPoint from './DataPoint.js';

const Valid = (
  <DataPoint
    percentChangeAccessibilityLabel="Value change icon accessibility label"
    title="Title"
    value="1M"
    percentChange={30}
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <DataPoint nonexisting={33} />;

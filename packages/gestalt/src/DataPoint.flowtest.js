// @flow strict
import React from 'react';
import DataPoint from './DataPoint.js';

const Valid = (
  <DataPoint
    infoIconAccessibilityLabel="Info icon accessibility label"
    valueChangeIconAccessibilityLabel="Value change icon accessibility label"
    title="Title"
    value="1M"
    valueChange={30}
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <DataPoint nonexisting={33} />;

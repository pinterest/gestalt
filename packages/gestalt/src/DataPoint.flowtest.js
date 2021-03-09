// @flow strict
import React from 'react';
import DataPoint from './DataPoint.js';

const Valid = <DataPoint />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <DataPoint nonexisting={33} />;

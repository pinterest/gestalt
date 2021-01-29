// @flow strict
import React from 'react';
import Callout from './Callout.js';

const Valid = (
  <Callout message="Callout error message" iconAccessibilityLabel="error" type="error" />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Callout nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Callout />;

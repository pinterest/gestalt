// @flow strict
import React from 'react';
import Upsell from './Upsell.js';
import Icon from './Icon.js';
import Box from './Box.js';

const Valid = (
  <Upsell message="Upsell message" imageData={{ component: <Icon accessibilityLabel="test" /> }} />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Upsell nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Upsell />;

const InvalidImage = (
  // $FlowExpectedError[incompatible-type]
  <Upsell message="Upsell message" imageData={{ component: <Box /> }} />
);

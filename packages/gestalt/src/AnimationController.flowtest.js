// @flow strict
import React from 'react';
import { AnimationController } from './AnimationController.js';

const Valid = (
  <AnimationController onDismissEnd={() => {}}>
    {onDismissStart => <section />}
  </AnimationController>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <AnimationController />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <AnimationController onDismissStart={() => {}} />;

// $FlowExpectedError[prop-missing]
// $FlowExpectedError[incompatible-type]
const InvalidTypeProp = <AnimationController onDismissEnd={null} />;

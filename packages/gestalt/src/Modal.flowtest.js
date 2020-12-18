// @flow strict
import React from 'react';
import Modal from './Modal.js';
import Text from './Text.js';

const Valid = <Modal accessibilityModalLabel="Modal" onDismiss={() => {}} />;

// $FlowExpectedError[incompatible-type]
const MissingProp = <Modal />;

// $FlowExpectedError[incompatible-type]
const NonExistingProp = <Modal nonexisting={33} />;

const InvalidProp = (
  <Modal
    accessibilityModalLabel="Modal"
    onDismiss={() => {}}
    // $FlowExpectedError[incompatible-type]
    heading={<Text>Test</Text>}
    subHeading="clever subheading"
  />
);

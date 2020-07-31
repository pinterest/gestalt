// @flow strict
import React from 'react';
import Modal from './Modal.js';

const Valid = <Modal accessibilityModalLabel="Modal" onDismiss={() => {}} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Modal />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Modal nonexisting={33} />;

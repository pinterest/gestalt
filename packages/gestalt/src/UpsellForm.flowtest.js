// @flow strict
import React from 'react';
import UpsellForm from './UpsellForm.js';

const Valid = <UpsellForm />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <UpsellForm nonexisting={33} />;

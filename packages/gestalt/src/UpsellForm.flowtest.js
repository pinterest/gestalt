// @flow strict
import React from 'react';
import TextField from './TextField.js';
import UpsellForm from './UpsellForm.js';

const Valid = (
  <UpsellForm
    onSubmit={() => {}}
    submitButtonText="Submit"
    submitButtonAccessibilityLabel="Submit button"
  >
    <TextField id="name" placeholder="Name" onChange={() => {}} />
  </UpsellForm>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <UpsellForm />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <UpsellForm nonexisting={33} />;

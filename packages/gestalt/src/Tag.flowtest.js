// @flow strict
import React from 'react';
import Tag from './Tag.js';

const Valid = (
  <Tag text="New" onRemove={() => {}} removeIconAccessibilityLabel="Remove" />
);

const ValidDisabled = <Tag text="New" disabled />;

const ValidError = (
  <Tag
    text="New"
    onRemove={() => {}}
    removeIconAccessibilityLabel="Remove"
    errorMessage="Error"
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <Tag nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Tag text="New" />;

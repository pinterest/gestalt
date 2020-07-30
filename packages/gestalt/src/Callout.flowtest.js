// @flow strict
import React from 'react';
import Callout from './Callout.js';

const Valid = (
  <Callout
    description="Callout error message"
    iconAccessibilityLabel="error"
    type="error"
  />
);

// $FlowExpectedError[prop-missing] Cannot create `Callout` element because property `nonexisting` is missing in  props.
const NonExistingProp = <Callout nonexisting={33} />;

// $FlowExpectedError[prop-missing] Cannot create `Callout` element because property `description` / `type` / `iconAccessiblityLabel` is missing in  props
const MissingProp = <Callout />;

// @flow strict
import React from 'react';
import Typeahead from './Typeahead.js';

const Valid = (
  <Typeahead id="Typeahead" noResultText="No Result" options={[{ value: '1', label: 'label' }]} />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Typeahead />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Typeahead nonexisting={33} />;

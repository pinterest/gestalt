// @flow strict
import React from 'react';
import Badge from './Badge.js';

const Valid = <Badge text="new" />;

// $FlowExpectedError[prop-missing] Cannot create `Badge` element because property `nonexisting` is missing in  props.
const NonExistingProp = <Badge nonexisting={33} />;

// $FlowExpectedError[prop-missing] Cannot create `Badge` element because property `text` is missing in props
const MissingProp = <Badge />;

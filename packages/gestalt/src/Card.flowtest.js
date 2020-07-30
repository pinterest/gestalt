// @flow strict
import React from 'react';
import Card from './Card.js';

const Valid = <Card />;

// $FlowExpectedError[prop-missing] Cannot create `Card` element because property `nonexisting` is missing in  props.
const NonExistingProp = <Card nonexisting={33} />;

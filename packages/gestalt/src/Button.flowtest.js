// @flow strict
import React from 'react';
import Button from './Button.js';

const Valid = <Button text="Next" />;

// $FlowExpectedError[prop-missing] Cannot create `Button` element because property `nonexisting` is missing in  props.
const NonExistingProp = <Button nonexisting={33} />;

// $FlowExpectedError[prop-missing] Cannot create `Button` element because property `text` is missing in props
const MissingProp = <Button />;

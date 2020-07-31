// @flow strict
import React from 'react';
import Button from './Button.js';

const Valid = <Button text="Next" />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Button nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Button />;

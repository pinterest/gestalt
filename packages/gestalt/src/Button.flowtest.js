// @flow strict
import React from 'react';
import Button from './Button.js';

const Valid = <Button text="Next" />;

const NonExistingProp = (
  // $FlowExpectedError[incompatible-type]
  <Button type="link" href="http://localhost:3000/Button" nonexisting={33} />
);

// $FlowExpectedError[incompatible-type]
const MissingProp = <Button />;

// @flow strict
import React from 'react';
import IconButton from './IconButton.js';

const Valid = <IconButton icon="add" accessibilityLabel="Add" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <IconButton />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <IconButton nonexisting={33} />;

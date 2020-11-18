// @flow strict
import React from 'react';
import Dropdown from './Dropdown.js';

const Valid = <Dropdown />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Dropdown nonexisting={33} />;

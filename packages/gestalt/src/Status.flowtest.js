// @flow strict
import React from 'react';
import Status from './Status.js';

const Valid = <Status />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Status nonexisting={33} />;

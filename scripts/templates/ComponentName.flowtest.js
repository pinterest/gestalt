// @flow strict
import React from 'react';
import ComponentName from './ComponentName.js';

const Valid = <ComponentName />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <ComponentName nonexisting={33} />;

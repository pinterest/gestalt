// @flow strict
import React from 'react';
import Avatar from './Avatar.js';

const Valid = <Avatar name="Yen-Wei" />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Avatar nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Avatar size="sm" />;

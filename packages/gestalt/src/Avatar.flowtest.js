// @flow strict
import React from 'react';
import Avatar from './Avatar.js';

const Valid = <Avatar name="Yen-Wei" />;

// $FlowExpectedError[prop-missing] Cannot create `Avatar` element because property `nonexisting` is missing in Props
const NonExistingProp = <Avatar nonexisting={33} />;

// $FlowExpectedError[prop-missing] Cannot create `Avatar` element because property `name` is missing in Props
const MissingProp = <Avatar size="sm" />;

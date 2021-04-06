// @flow strict
import React from 'react';
import AvatarGroup from './AvatarGroup.js';

const Valid = <AvatarGroup />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <AvatarGroup nonexisting={33} />;

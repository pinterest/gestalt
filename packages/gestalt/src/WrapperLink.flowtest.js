// @flow strict
import React from 'react';
import WrapperLink from './WrapperLink.js';

const Valid = <WrapperLink href="https://example.com">content</WrapperLink>;

// $FlowExpectedError[prop-missing]
const MissingProp = <WrapperLink />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <WrapperLink nonexisting={33} />;

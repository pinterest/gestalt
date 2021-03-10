// @flow strict
import React from 'react';
import PageHeader from './PageHeader.js';

const Valid = <PageHeader />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <PageHeader nonexisting={33} />;

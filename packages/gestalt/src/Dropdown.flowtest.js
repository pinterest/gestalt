// @flow strict
import React from 'react';
import Dropdown from './Dropdown.js';

const Valid = (
  <Dropdown onDismiss={() => {}}>
    <Dropdown.Item option={{ label: 'Item 1', value: 'Item 1' }} />
  </Dropdown>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <Dropdown nonexisting={33} />;

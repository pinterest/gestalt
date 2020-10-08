// @flow strict
import React from 'react';
import ExpandableModule from './ExpandableModule.js';

const Valid = (
  <ExpandableModule
    id="uniqueTestID"
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
    items={[
      {
        title: 'Title',
        icon: 'lock',
        iconAccessibilityLabel: 'test label',
        summary: ['summary1', 'summary2', 'summary3'],
        type: 'info',
        children: 'test children',
      },
    ]}
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <ExpandableModule />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ExpandableModule nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const InvalidTypeProp = <ExpandableModule size="xxl" />;

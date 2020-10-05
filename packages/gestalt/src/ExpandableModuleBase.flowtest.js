// @flow strict
import React from 'react';
import ExpandableModuleBase from './ExpandableModuleBase.js';

const Valid = (
  <ExpandableModuleBase
    title="test title"
    icon="lock"
    titleIconAccessibilityLabel="test label"
    arrowIconAccessibilityLabel="test label"
    summary={['summary1', 'summary2', 'summary3']}
    isCollapsed={false}
    type="info"
    onModuleClicked={() => {}}
  >
    <div>test children</div>
  </ExpandableModuleBase>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <ExpandableModuleBase />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ExpandableModuleBase nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const InvalidTypeProp = <ExpandableModuleBase size="xxl" />;

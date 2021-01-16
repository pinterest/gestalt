// @flow strict
import React from 'react';
import ModuleExpandableItem from './ModuleExpandableItem.js';

const Valid = (
  <ModuleExpandableItem
    id="uniqueTestID"
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
    title="test title"
    icon="lock"
    iconAccessibilityLabel="test label"
    summary={['summary1', 'summary2', 'summary3']}
    isCollapsed={false}
    type="info"
    onModuleClicked={() => {}}
  >
    <div>test children</div>
  </ModuleExpandableItem>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <ModuleExpandableItem />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ModuleExpandableItem nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const InvalidTypeProp = <ModuleExpandableItem size="xxl" />;

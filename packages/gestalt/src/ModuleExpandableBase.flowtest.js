// @flow strict
import React from 'react';
import ModuleExpandableBase from './ModuleExpandableBase.js';

const Valid = (
  <ModuleExpandableBase
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
  </ModuleExpandableBase>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <ModuleExpandableBase />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ModuleExpandableBase nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const InvalidTypeProp = <ModuleExpandableBase size="xxl" />;

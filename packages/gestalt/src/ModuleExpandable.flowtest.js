// @flow strict
import ModuleExpandable from './ModuleExpandable.js';

const Valid = (
  <ModuleExpandable
    id="uniqueTestID"
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
    expandedIndex={0}
    onExpandedChange={() => {}}
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
const MissingProp = <ModuleExpandable />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ModuleExpandable nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const InvalidTypeProp = <ModuleExpandable size="xxl" />;

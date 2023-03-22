// @flow strict
import ModuleExpandableItem from './ExpandableItem.js';
import IconButton from '../IconButton.js';

const Valid = (
  <ModuleExpandableItem
    accessibilityCollapseLabel="click to collapse"
    accessibilityExpandLabel="click to expand"
    badge={{ text: 'badge-text' }}
    id="uniqueTestID"
    icon="lock"
    iconAccessibilityLabel="test label"
    iconButton={
      <IconButton
        bgColor="lightGray"
        icon="question-mark"
        iconColor="darkGray"
        accessibilityLabel="Get help"
        size="xs"
        onClick={() => {}}
      />
    }
    isCollapsed={false}
    onModuleClicked={() => {}}
    summary={['summary1', 'summary2', 'summary3']}
    title="test title"
    type="info"
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

// @flow strict
import AccordionExpandableItem from './ExpandableItem';
import IconButton from '../IconButton';

const Valid = (
  <AccordionExpandableItem
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
    onExpand={() => {}}
    summary={['summary1', 'summary2', 'summary3']}
    title="test title"
    type="info"
  >
    <div>test children</div>
  </AccordionExpandableItem>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <AccordionExpandableItem />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <AccordionExpandableItem nonexisting={33} />;

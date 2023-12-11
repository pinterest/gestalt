// @flow strict
import AccordionExpandable from './AccordionExpandable';
import IconButton from './IconButton';

const ValidWithMinimumProps = <AccordionExpandable id="accordion-expandable-id" items={[]} />;

const ValidWithBaseProps = (
  <AccordionExpandable
    id="accordion-expandable-id"
    expandedIndex={0}
    onExpandedChange={() => {}}
    items={[
      {
        children: 'test children',
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
  />
);

const ValidWithBadgeTextProps = (
  <AccordionExpandable
    id="accordion-expandable-id"
    expandedIndex={0}
    onExpandedChange={() => {}}
    items={[
      {
        badge: { text: 'badge-text' },
        children: 'test children',
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
  />
);

const ValidWithIconProps = (
  <AccordionExpandable
    id="accordion-expandable-id"
    expandedIndex={0}
    onExpandedChange={() => {}}
    items={[
      {
        children: 'test children',
        icon: 'lock',
        iconAccessibilityLabel: 'Accordion is Locked',
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
  />
);

const ValidWithIconButtonProps = (
  <AccordionExpandable
    id="accordion-expandable-id"
    expandedIndex={0}
    onExpandedChange={() => {}}
    items={[
      {
        children: 'test children',
        iconButton: (
          <IconButton
            bgColor="lightGray"
            icon="question-mark"
            iconColor="darkGray"
            accessibilityLabel="Get help"
            size="xs"
            onClick={() => {}}
          />
        ),
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
  />
);

// $FlowExpectedError[prop-missing]
const InvalidWithMissingProps = <AccordionExpandable />;

const InvalidWithNonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <AccordionExpandable id="accordion-id" nonexisting={33} />
);

const InvalidTypeProp = (
  <AccordionExpandable
    // $FlowExpectedError[incompatible-type]
    id={123}
    // $FlowExpectedError[incompatible-type]
    items={{ title: 'Title' }}
  />
);

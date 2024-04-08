// @flow strict
import AccordionExpandable from './AccordionExpandable';
import IconButton from './IconButton';

const ValidWithMinimumProps = <AccordionExpandable id="accordion-expandable-id" items={[]} />;

const ValidWithBaseProps = (
  <AccordionExpandable
    expandedIndex={0}
    id="accordion-expandable-id"
    items={[
      {
        children: 'test children',
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
    onExpandedChange={() => {}}
  />
);

const ValidWithBadgeTextProps = (
  <AccordionExpandable
    expandedIndex={0}
    id="accordion-expandable-id"
    items={[
      {
        badge: { text: 'badge-text' },
        children: 'test children',
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
    onExpandedChange={() => {}}
  />
);

const ValidWithIconProps = (
  <AccordionExpandable
    expandedIndex={0}
    id="accordion-expandable-id"
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
    onExpandedChange={() => {}}
  />
);

const ValidWithIconButtonProps = (
  <AccordionExpandable
    expandedIndex={0}
    id="accordion-expandable-id"
    items={[
      {
        children: 'test children',
        iconButton: (
          <IconButton
            accessibilityLabel="Get help"
            bgColor="lightGray"
            icon="question-mark"
            iconColor="darkGray"
            onClick={() => {}}
            size="xs"
          />
        ),
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
    onExpandedChange={() => {}}
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

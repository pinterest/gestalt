// @flow strict
import ModuleExpandable from './ModuleExpandable.js';
import IconButton from './IconButton.js';

const ValidWithMinimumProps = (
  <ModuleExpandable
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
    id="module-expandable-id"
    items={[]}
  />
);

const ValidWithBaseProps = (
  <ModuleExpandable
    id="module-expandable-id"
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
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
  <ModuleExpandable
    id="module-expandable-id"
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
    expandedIndex={0}
    onExpandedChange={() => {}}
    items={[
      {
        badgeText: 'badge-text',
        children: 'test children',
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
  />
);

const ValidWithIconProps = (
  <ModuleExpandable
    id="module-expandable-id"
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
    expandedIndex={0}
    onExpandedChange={() => {}}
    items={[
      {
        children: 'test children',
        icon: 'lock',
        iconAccessibilityLabel: 'Module is Locked',
        summary: ['summary1', 'summary2', 'summary3'],
        title: 'Title',
        type: 'info',
      },
    ]}
  />
);

const ValidWithIconButtonProps = (
  <ModuleExpandable
    id="module-expandable-id"
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
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
const InvalidWithMissingProps = <ModuleExpandable />;

const InvalidWithNonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <ModuleExpandable
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
    id="module-id"
    nonexisting={33}
  />
);

const InvalidTypeProp = (
  <ModuleExpandable
    accessibilityExpandLabel="click to expand"
    accessibilityCollapseLabel="click to collapse"
    // $FlowExpectedError[incompatible-type]
    id={123}
    // $FlowExpectedError[incompatible-type]
    items={{ title: 'Title' }}
  />
);

// @flow strict
import IconButton from './IconButton.js';
import Module from './Module.js';

const ValidWithMinimumProps = <Module id="module-id" />;

const ValidWithBaseProps = (
  <Module
    id="module-id"
    iconAccessibilityLabel="There is an error"
    title="Module Title"
    type="error"
  >
    <hr />
  </Module>
);

const ValidWithBadgeTextProps = (
  <Module
    badgeText="badge-text"
    iconAccessibilityLabel="There is an error"
    id="module-id"
    title="Module Title"
    type="error"
  >
    <hr />
  </Module>
);

const ValidWithIconProps = (
  <Module
    icon="lock"
    iconAccessibilityLabel="Module is Locked"
    id="module-id"
    title="Module Title"
    type="error"
  >
    <hr />
  </Module>
);

const ValidWithIconButtonProps = (
  <Module
    iconAccessibilityLabel="There is an error"
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
    id="module-id"
    title="Module Title"
    type="error"
  >
    <hr />
  </Module>
);

const InvalidWithMutuallyExclusiveProps = (
  // $FlowExpectedError[incompatible-type]
  <Module
    badgeText="badge-text"
    icon="lock"
    iconAccessibilityLabel="Module is Locked"
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
    id="module-id"
    title="Module Title"
    type="error"
  >
    <hr />
  </Module>
);

// $FlowExpectedError[incompatible-type]
const InvalidWithMissingProps = <Module />;

// $FlowExpectedError[incompatible-type]
const InvalidWithNonExistingProp = <Module id="module-id" nonexisting={33} />;

const InvalidTypeProp = (
  // $FlowExpectedError[incompatible-type]
  <Module id="module-id" title={<h1>Module Title</h1>} />
);

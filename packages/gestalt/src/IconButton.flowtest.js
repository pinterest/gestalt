// @flow strict
import IconButton from './IconButton.js';

const ValidDefaultIconButton = <IconButton icon="add" accessibilityLabel="Add" />;

const ValidLinkRoleIconButton = (
  <IconButton icon="add" accessibilityLabel="Add" role="link" href="http://www.pinterest.com" />
);

// $FlowExpectedError[incompatible-type]
const MissingProp = <IconButton />;

// $FlowExpectedError[incompatible-type]
const NonExistingProp = <IconButton nonexisting={33} />;

const IncompatibleLinkRoleProps = (
  // $FlowExpectedError[incompatible-type]
  <IconButton
    accessibilityExpanded
    icon="add"
    accessibilityLabel="Add"
    role="link"
    href="http://www.pinterest.com"
  />
);

const IncompatibleButtonRoleProps = (
  // $FlowExpectedError[incompatible-type]
  <IconButton
    accessibilityExpanded
    icon="add"
    accessibilityLabel="Add"
    role="button"
    target="blank"
  />
);

// @flow strict
import Tag from './Tag.js';

const Valid = <Tag text="New" onRemove={() => {}} removeIconAccessibilityLabel="Remove" />;

const ValidDisabled = <Tag text="New" disabled />;

const ValidError = (
  <Tag text="New" onRemove={() => {}} removeIconAccessibilityLabel="Remove" errorMessage="Error" />
);

// $FlowExpectedError[incompatible-type]
const MissingProp = <Tag />;

// $FlowExpectedError[incompatible-type]
const InvalidProps = <Tag nonexisting={33} />;

// $FlowExpectedError[incompatible-type]
const IncompleteProps = <Tag text="New" />;

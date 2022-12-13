// @flow strict
import Tag from './Tag.js';

const Valid = <Tag text="New" onRemove={() => {}} accessibilityRemoveIconLabel="Remove" />;

const ValidDisabled = <Tag text="New" disabled />;

const ValidError = (
  <Tag text="New" onRemove={() => {}} accessibilityRemoveIconLabel="Remove" type="error" />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Tag />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Tag nonexisting={33} />;

// $FlowExpectedError[incompatible-type]
const IncompleteProps = <Tag />;

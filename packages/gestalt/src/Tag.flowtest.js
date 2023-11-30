// @flow strict
import Tag from './Tag';

const Valid = <Tag text="New" onRemove={() => {}} accessibilityRemoveIconLabel="Remove" />;

const ValidDisabled = <Tag disabled onRemove={() => {}} text="New" />;

const ValidError = (
  <Tag text="New" onRemove={() => {}} accessibilityRemoveIconLabel="Remove" type="error" />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Tag />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Tag nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const IncompleteProps = <Tag />;

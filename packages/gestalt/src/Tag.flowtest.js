// @flow strict
import Tag from './Tag';

const Valid = <Tag accessibilityRemoveIconLabel="Remove" onRemove={() => {}} text="New" />;

const ValidDisabled = <Tag disabled onRemove={() => {}} text="New" />;

const ValidError = (
  <Tag accessibilityRemoveIconLabel="Remove" onRemove={() => {}} text="New" type="error" />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Tag />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Tag nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const IncompleteProps = <Tag />;

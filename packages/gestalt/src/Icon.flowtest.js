// @flow strict
import Icon from './Icon';

const Valid = <Icon accessibilityLabel="Add" icon="add" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Icon />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Icon nonexisting={33} />;

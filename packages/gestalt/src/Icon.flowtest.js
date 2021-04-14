// @flow strict
import Icon from './Icon.js';

const Valid = <Icon icon="add" accessibilityLabel="Add" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Icon />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Icon nonexisting={33} />;

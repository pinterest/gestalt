// @flow strict
import Badge from './Badge';

const Valid = <Badge text="new" />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Badge nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Badge />;

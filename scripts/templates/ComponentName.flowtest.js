// @flow strict
import ComponentName from './ComponentName';

const Valid = <ComponentName />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <ComponentName nonexisting={33} />;

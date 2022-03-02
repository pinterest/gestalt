// @flow strict
import ComponentName from './ComponentName.js';

const Valid = <ComponentName />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <ComponentName nonexisting={33} />;

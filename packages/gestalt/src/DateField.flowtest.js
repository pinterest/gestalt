// @flow strict
import DateField from './DateField.js';

const Valid = <DateField />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <DateField nonexisting={33} />;

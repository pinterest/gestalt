// @flow strict-local
import DateRange from './DateRange.js';

const Valid = <DateRange />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <DateRange nonexisting={33} />;

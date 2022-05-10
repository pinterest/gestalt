// @flow strict
import RadioGroup from './RadioGroup.js';

const Valid = <RadioGroup />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <RadioGroup nonexisting={33} />;

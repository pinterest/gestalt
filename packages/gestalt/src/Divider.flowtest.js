// @flow strict
import Divider from './Divider.js';

const Valid = <Divider />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Divider nonexisting={33} />;

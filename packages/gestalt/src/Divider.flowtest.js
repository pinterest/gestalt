// @flow strict
import Divider from './Divider';

const Valid = <Divider />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Divider nonexisting={33} />;

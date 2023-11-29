// @flow strict
import WashAnimated from './WashAnimated';

const Valid = <WashAnimated />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <WashAnimated nonexisting={33} />;

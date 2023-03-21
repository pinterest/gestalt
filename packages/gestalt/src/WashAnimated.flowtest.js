// @flow strict
import WashAnimated from './WashAnimated.js';

const Valid = <WashAnimated />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <WashAnimated nonexisting={33} />;

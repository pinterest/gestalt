// @flow strict
import Mask from './Mask';

const Valid = <Mask width={400}>content</Mask>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Mask nonexisting={33} />;

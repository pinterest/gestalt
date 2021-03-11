// @flow strict
import Heading from './Heading.js';

const Valid = <Heading size="sm">Heading</Heading>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Heading nonexisting={33} />;

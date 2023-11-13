// @flow strict
import Pog from './Pog';

const Valid = <Pog icon="add" />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Pog nonexisting={33} />;

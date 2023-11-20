// @flow strict
import Pulsar from './Pulsar';

const Valid = <Pulsar size={400} />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Pulsar nonexisting={33} />;

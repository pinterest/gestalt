// @flow strict
import Column from './Column';

const Valid = <Column span={1}>Hello world</Column>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Column span={1} nonexisting={33} />;

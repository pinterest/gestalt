// @flow strict
import Column from './Column';

const Valid = <Column span={1}>Hello world</Column>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Column nonexisting={33} span={1} />;

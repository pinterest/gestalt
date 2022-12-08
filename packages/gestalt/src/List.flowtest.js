// @flow strict
import List from './List.js';

const Valid = <List />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <List nonexisting={33} />;

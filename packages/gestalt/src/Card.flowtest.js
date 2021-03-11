// @flow strict
import Card from './Card.js';

const Valid = <Card />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Card nonexisting={33} />;

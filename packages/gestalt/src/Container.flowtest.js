// @flow strict
import Container from './Container.js';

const Valid = <Container />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Container nonexisting={33} />;

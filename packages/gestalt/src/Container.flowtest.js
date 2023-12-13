// @flow strict
import Container from './Container';

const Valid = <Container />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Container nonexisting={33} />;

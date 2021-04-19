// @flow strict
import ScrollBoundaryContainer from './ScrollBoundaryContainer.js';
import Box from './Box.js';

const Valid = (
  <ScrollBoundaryContainer>
    <Box />
  </ScrollBoundaryContainer>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <ScrollBoundaryContainer nonexisting={33} />;

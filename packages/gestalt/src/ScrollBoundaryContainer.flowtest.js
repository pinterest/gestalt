// @flow strict
import Box from './Box.js';
import ScrollBoundaryContainer from './ScrollBoundaryContainer.js';

const Valid = (
  <ScrollBoundaryContainer>
    <Box />
  </ScrollBoundaryContainer>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <ScrollBoundaryContainer nonexisting={33} />;

// @flow strict
import Box from './Box';
import ScrollBoundaryContainer from './ScrollBoundaryContainer';

const Valid = (
  <ScrollBoundaryContainer>
    <Box />
  </ScrollBoundaryContainer>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <ScrollBoundaryContainer nonexisting={33} />;

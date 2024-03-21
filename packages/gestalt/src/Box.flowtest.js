// @flow strict
import Box from './Box';

const Valid = <Box>Text</Box>;
const ValidAs = <Box as="aside" margin={3} />;

// $FlowExpectedError[incompatible-type]
const IncorrectMargin = <Box margin={33} />;

// $FlowExpectedError[incompatible-type]
const IncorrectAs = <Box as="invalid" margin={3} />;

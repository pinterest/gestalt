// @flow strict
import Box from './Box.js';

const Valid = <Box>Text</Box>;

// $FlowExpectedError[incompatible-type]
const IncorrectMargin = <Box margin={33} />;

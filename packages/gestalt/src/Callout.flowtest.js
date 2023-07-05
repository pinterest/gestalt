// @flow strict
import Box from './Box.js';
import Callout from './Callout.js';
import Text from './Text.js';

const Valid = (
  <Callout message="Callout error message" iconAccessibilityLabel="error" type="error" />
);

const validTextProp = (
  <Callout message={<Text>Hello</Text>} iconAccessibilityLabel="error" type="error" />
);

const invalidTextProp = (
  // $FlowExpectedError[incompatible-type]
  <Callout message={<Box>Hello</Box>} iconAccessibilityLabel="error" type="error" />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Callout nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Callout />;

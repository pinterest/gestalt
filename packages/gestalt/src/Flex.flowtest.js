// @flow strict
import Flex from './Flex.js';

const Valid = (
  <Flex>
    <div />
  </Flex>
);

const ValidWithProps = (
  <Flex gap={2}>
    <div />
  </Flex>
);

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <Flex nonexisting={33}>
    <div />
  </Flex>
);

const BadPropValue = (
  // $FlowExpectedError[incompatible-type]
  <Flex gap={false}>
    <div />
  </Flex>
);

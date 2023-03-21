// @flow strict
import Heading from './Heading.js';

const Valid = <Heading size="400">Heading</Heading>;

const ValidAccessibilityLevel1 = (
  <Heading size="400" accessibilityLevel={1}>
    Heading
  </Heading>
);

const ValidAccessibilityLevelNone = (
  <Heading size="400" accessibilityLevel="none">
    Heading
  </Heading>
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Heading nonexisting={33} />;

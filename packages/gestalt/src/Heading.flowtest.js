// @flow strict
import Heading from './Heading.js';

const Valid = <Heading size="sm">Heading</Heading>;

const ValidccessibilityLevel1 = (
  <Heading size="sm" accessibilityLevel={1}>
    Heading
  </Heading>
);

const ValidAccessibilityLevelNone = (
  <Heading size="sm" accessibilityLevel="none">
    Heading
  </Heading>
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Heading nonexisting={33} />;

// @flow strict
import Heading from './Heading';

const Valid = <Heading size="400">Heading</Heading>;

const ValidAccessibilityLevel1 = (
  <Heading accessibilityLevel={1} size="400">
    Heading
  </Heading>
);

const ValidAccessibilityLevelNone = (
  <Heading accessibilityLevel="none" size="400">
    Heading
  </Heading>
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Heading nonexisting={33} />;

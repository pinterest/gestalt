// @flow strict
import Box from './Box';
import Icon from './Icon';
import Upsell from './Upsell';

const Valid = (
  <Upsell message="Upsell message" imageData={{ component: <Icon accessibilityLabel="test" /> }} />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Upsell nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Upsell />;

const InvalidImage = (
  // $FlowExpectedError[incompatible-type]
  <Upsell message="Upsell message" imageData={{ component: <Box /> }} />
);

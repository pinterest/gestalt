// @flow strict
import BannerUpsell from './BannerUpsell';
import Box from './Box';
import Icon from './Icon';

const Valid = (
  <BannerUpsell
    imageData={{ component: <Icon accessibilityLabel="test" /> }}
    message="BannerUpsell message"
  />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <BannerUpsell nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <BannerUpsell />;

const InvalidImage = (
  // $FlowExpectedError[incompatible-type]
  <BannerUpsell imageData={{ component: <Box /> }} message="BannerUpsell message" />
);

// @flow strict
import BannerUpsell from './BannerUpsell';
import Box from './Box';
import Icon from './Icon';

const Valid = (
  <BannerUpsell
    message="BannerUpsell message"
    imageData={{ component: <Icon accessibilityLabel="test" /> }}
  />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <BannerUpsell nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <BannerUpsell />;

const InvalidImage = (
  // $FlowExpectedError[incompatible-type]
  <BannerUpsell message="BannerUpsell message" imageData={{ component: <Box /> }} />
);

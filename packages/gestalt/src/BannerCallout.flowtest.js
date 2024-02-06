// @flow strict
import BannerCallout from './BannerCallout';

const Valid = (
  <BannerCallout
    message="BannerCallout error message"
    iconAccessibilityLabel="error"
    type="error"
  />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <BannerCallout nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <BannerCallout />;

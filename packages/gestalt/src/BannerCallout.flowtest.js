// @flow strict
import BannerCallout from './BannerCallout';

const Valid = (
  <BannerCallout
    iconAccessibilityLabel="error"
    message="BannerCallout error message"
    type="error"
  />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <BannerCallout nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <BannerCallout />;

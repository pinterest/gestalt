// @flow strict
import BannerOverlay from './BannerOverlay';

const Valid = <BannerOverlay message="This is a message warning you." title="Warning!" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <BannerOverlay />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <BannerOverlay nonexisting={33} />;

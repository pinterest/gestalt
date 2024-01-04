// @flow strict
import BannerOverlay from './BannerOverlay';

const Valid = <BannerOverlay title="Warning!" message="This is a message warning you." />;

// $FlowExpectedError[prop-missing]
const MissingProp = <BannerOverlay />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <BannerOverlay nonexisting={33} />;

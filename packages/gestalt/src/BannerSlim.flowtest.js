// @flow strict
import BannerSlim from './BannerSlim';

const Valid = <BannerSlim message="test" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <BannerSlim nonexisting={33} />;

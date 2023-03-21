// @flow strict
import SlimBanner from './SlimBanner.js';

const Valid = <SlimBanner message="test" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <SlimBanner nonexisting={33} />;

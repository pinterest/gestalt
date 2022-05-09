// @flow strict
import SlimBanner from './SlimBanner.js';

const Valid = <SlimBanner />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <SlimBanner nonexisting={33} />;

// @flow strict
import DensityProvider from './DensityProvider.js';

const Valid = <DensityProvider />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <DensityProvider nonexisting={33} />;

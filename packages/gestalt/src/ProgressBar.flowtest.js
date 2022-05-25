// @flow strict
import ProgressBar from './ProgressBar.js';

const Valid = <ProgressBar />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <ProgressBar nonexisting={33} />;

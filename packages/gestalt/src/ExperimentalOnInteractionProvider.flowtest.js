// @flow strict
import ExperimentalOnInteractionProvider from './ExperimentalOnInteractionProvider.js';

const Valid = <ExperimentalOnInteractionProvider />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <ExperimentalOnInteractionProvider nonexisting={33} />;

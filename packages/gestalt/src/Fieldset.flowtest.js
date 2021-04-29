// @flow strict
import Fieldset from './Fieldset.js';

const Valid = <Fieldset />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Fieldset nonexisting={33} />;

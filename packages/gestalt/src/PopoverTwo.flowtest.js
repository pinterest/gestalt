// @flow strict
import PopoverTwo from './PopoverTwo.js';

const Valid = <PopoverTwo />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <PopoverTwo nonexisting={33} />;

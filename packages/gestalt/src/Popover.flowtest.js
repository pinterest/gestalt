// @flow strict
import Popover from './Popover.js';

const Valid = <Popover anchor={document.createElement('div')} onDismiss={() => {}} />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Popover nonexisting={33} />;

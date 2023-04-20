// @flow strict
import InternalPopover from './InternalPopover.js';

const Valid = <InternalPopover anchor={document.createElement('div')} onDismiss={() => {}} />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <InternalPopover nonexisting={33} />;

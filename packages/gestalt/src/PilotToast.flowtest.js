// @flow strict
import PilotToast from './PilotToast.js';

const Valid = <PilotToast text="Warning" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <PilotToast />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <PilotToast nonexisting={33} />;

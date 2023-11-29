// @flow strict
import InternalLabel from './InternalLabel';

const Valid = <InternalLabel _labelDisplay="hidden" htmlFor="foo" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <InternalLabel />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <InternalLabel nonexisting={33} />;

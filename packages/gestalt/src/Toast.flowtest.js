// @flow strict
import Toast from './Toast';

const Valid = <Toast text="Warning" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Toast />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Toast nonexisting={33} />;

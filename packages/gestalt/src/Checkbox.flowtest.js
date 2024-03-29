// @flow strict
import Checkbox from './Checkbox';

const Valid = <Checkbox id="send-emails" onChange={() => {}} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Checkbox />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Checkbox nonexisting={33} />;

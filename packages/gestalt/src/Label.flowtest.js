// @flow strict
import Label from './Label.js';

const Valid = <Label htmlFor="foo" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Label />; // eslint-disable-line jsx-a11y/label-has-associated-control

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Label nonexisting={33} />; // eslint-disable-line jsx-a11y/label-has-associated-control

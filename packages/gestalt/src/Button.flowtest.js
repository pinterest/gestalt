// @flow strict
import Button from './Button';

const ValidDefaultButtonType = <Button text="Next" />;

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <Button nonexisting={33} text="Next" />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Button />;

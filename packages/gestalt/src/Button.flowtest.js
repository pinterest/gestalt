// @flow strict
import Button from './Button';

const ValidDefaultButtonType = <Button text="Next" />;

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <Button text="Next" nonexisting={33} />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Button />;

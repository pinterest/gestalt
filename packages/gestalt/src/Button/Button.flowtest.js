// @flow strict
import Button from './Button.js';

const ValidDefaultButtonType = <Button text="Next" />;

const ValidLinkRole = <Button text="Next" role="link" href="http://www.pinterest.com" />;

const ValidSubmitType = <Button text="Next" type="submit" />;

const NonExistingProp = (
  // $FlowExpectedError[incompatible-type]
  <Button text="Next" nonexisting={33} />
);

// $FlowExpectedError[incompatible-type]
const MissingProp = <Button />;

const IncompatibleLinkProps = (
  // $FlowExpectedError[incompatible-type]
  <Button text="Next" role="link" name="d" onClick={() => {}} />
);

const IncompatibleSubmitProps = (
  // $FlowExpectedError[incompatible-type]
  <Button text="Next" type="submit" target="blank" />
);

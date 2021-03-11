// @flow strict
import TapArea from './TapArea.js';

const ValidDefaultTapAreaType = <TapArea />;

const ValidLinkRole = <TapArea role="link" href="http://www.pinterest.com" />;

const NonExistingProp = (
  // $FlowExpectedError[incompatible-type]
  <TapArea nonexisting={33} />
);

const IncompatibleLinkProps = (
  // $FlowExpectedError[incompatible-type]
  <TapArea role="link" accessibilityHasPop />
);

const IncompatibleDefaultTapAreaProps = (
  // $FlowExpectedError[incompatible-type]
  <TapArea type="button" target="blank" />
);

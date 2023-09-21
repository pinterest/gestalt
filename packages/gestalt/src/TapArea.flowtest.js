// @flow strict
import TapArea from './TapArea.js';

const ValidDefaultTapAreaType = <TapArea />;

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <TapArea nonexisting={33} />
);

const IncompatibleDefaultTapAreaProps = (
  // $FlowExpectedError[prop-missing]
  <TapArea type="button" target="blank" />
);

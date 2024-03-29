// @flow strict
import TapArea from './TapArea';

const ValidDefaultTapAreaType = <TapArea>text</TapArea>;

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <TapArea nonexisting={33} />
);

const IncompatibleDefaultTapAreaProps = (
  // $FlowExpectedError[prop-missing]
  <TapArea target="blank" type="button" />
);

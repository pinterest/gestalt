// @flow strict
import Letterbox from './Letterbox';

const Valid = (
  <Letterbox contentAspectRatio={564 / 806} height={50} width={50}>
    content
  </Letterbox>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Letterbox />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Letterbox nonexisting={33} />;

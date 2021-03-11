// @flow strict
import Letterbox from './Letterbox.js';

const Valid = (
  <Letterbox width={50} height={50} contentAspectRatio={564 / 806}>
    content
  </Letterbox>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Letterbox />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Letterbox nonexisting={33} />;
